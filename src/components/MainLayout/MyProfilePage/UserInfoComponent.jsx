import React from "react";
import useAppContext from "../../../contexts/AppContext";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Formik } from "formik";
import * as Yup from "yup";

import { NotificationManager } from "react-notifications";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { USER_UPDATE } from "../../../queries/user";
import { COMPANY_GET_OPTIONS } from "../../../queries/company";

import LoadingComponent from "../../../components/LoadingComponent";
import { handleHttpError } from "../../../utils/errorHandler";

const schema = Yup.object({
	firstname: Yup.string().required(),
	name: Yup.string().required(),
	email: Yup.string().required(),
	address: Yup.string().required(),
	phone: Yup.string()
		.matches(/^((\+)33|0)[1-9](\d{2}){4}$/, 'Le numéro doit être sous ce format: +3312345678')
		.required(),
	company_id: Yup.number(),
	// phone: Yup.bool().oneOf([true]),
});

const UserInfoComponent = () => {
	const context = useAppContext();

	const { user } = context.state;

	const [userUpdate] = useMutation(USER_UPDATE);

	const { loading: isLoadingCompanies, data: companyData, error } = useQuery(COMPANY_GET_OPTIONS);

	if (!user) {
		return null;
	} else if (isLoadingCompanies) {
		return <LoadingComponent />;
	} else if (error) {
		return handleHttpError(error);
	}

	const companies = companyData ? companyData.company : [];
	const companyOptions = companies.map((c) => ({
		value: c.id,
		label: c.name,
	}));

	const initialValues = {
		firstname: user.firstname || "",
		name: user.name || "",
		email: user.email || "",
		address: user.address || "",
		phone: user.phone || "",
		company_id: user.company ? user.company.id : 0,
	};

	const onSubmit = (values) => {
		const formattedValues = {
			email: values.email,
			first_name: values.firstname,
			name: values.name,
			phone: values.phone,
			address: values.address,
			company_id: values.company_id === 0 ? null : values.company_id,
		};

		userUpdate({ variables: { ...formattedValues, uid: user.uid } })
			.then(({ data }) => {
				const newUser = data.update_user.returning[0];

				context.setUser({ ...user, ...newUser });
				NotificationManager.success(`Mise à jours effectuée`, "Informations éditées");
			})
			.catch((error) => {
				NotificationManager.warning(error.message, "Attention");
			});
	};

	return (
		<Formik
			validationSchema={schema}
			initialValues={initialValues}
			validateOnChange={true}
			validateOnBlur={false}
			onSubmit={onSubmit}
		>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				values,
				touched,
				isValid,
				errors,
				setFieldTouched,
			}) => (
				<Form noValidate onSubmit={handleSubmit} className="my-informations">
					<div className="line">
						<p className="line-title">Avatar:</p>
						<p className="line-content text-right">
							<img src={user.picture} alt="Avatar" />
						</p>
					</div>
					<div className="line">
						<p className="line-title">Prénom:</p>
						<p className="line-content">
							<Form.Control
								type="text"
								name="firstname"
								className="line-content"
								placeholder={"Prénom"}
								value={values.firstname}
								onChange={(e) => setFieldTouched("firstname") && handleChange(e)}
								isInvalid={touched.firstname && !!errors.firstname}
								isValid={touched.firstname && !errors.firstname}
							/>
						</p>
					</div>
					<div className="line">
						<p className="line-title">Nom d'affichage:</p>
						<p className="line-content">
							<Form.Control
								type="text"
								name="name"
								className="line-content"
								placeholder={"Nom d'affichage"}
								value={values.name}
								onChange={(e) => setFieldTouched("name") && handleChange(e)}
								isInvalid={touched.name && !!errors.name}
								isValid={touched.name && !errors.name}
							/>
						</p>
					</div>
					<div className="line">
						<p className="line-title">Email:</p>
						<p className="line-content">
							<Form.Control
								type="text"
								name="email"
								className="line-content"
								placeholder={"Email"}
								value={values.email}
								onChange={(e) => setFieldTouched("email") && handleChange(e)}
								isInvalid={touched.email && !!errors.email}
								isValid={touched.email && !errors.email}
							/>
						</p>
					</div>
					<div className="line">
						<p className="line-title">Adresse:</p>
						<p className="line-content">
							<Form.Control
								type="text"
								name="address"
								className="line-content"
								placeholder={"Adresse"}
								value={values.address}
								onChange={(e) => setFieldTouched("address") && handleChange(e)}
								isInvalid={touched.address && !!errors.address}
								isValid={touched.address && !errors.address}
							/>
						</p>
					</div>
					<div className="line">
						<p className="line-title">Téléphone:</p>
						<div className="line-content">
							<Form.Control
								type="text"
								name="phone"
								className="line-content"
								placeholder={"+33612345678"}
								value={values.phone}
								onChange={(e) => setFieldTouched("phone") && handleChange(e)}
								isInvalid={touched.phone && !!errors.phone}
								isValid={touched.phone && !errors.phone}
							/>
							<Form.Control.Feedback type="invalid">
								{errors.phone}
							</Form.Control.Feedback>
						</div>
					</div>
					<div className="line">
						<p className="line-title">Entreprise:</p>
						<p className="line-content">
							<Form.Control
								as="select"
								name="company_id"
								className="line-content"
								placeholder={"Laisser vide si aucune..."}
								value={values.company_id}
								onChange={(e) => setFieldTouched("company_id") && handleChange(e)}
								isInvalid={touched.company_id && !!errors.company_id}
								isValid={touched.company_id && !errors.company_id}
							>
								<option value={0}>- Je ne suis pas une entreprise</option>
								{companyOptions.map((opt) => (
									<option key={`company-opt-${opt.value}`} value={opt.value}>
										{opt.label}
									</option>
								))}
							</Form.Control>
						</p>
					</div>
					<Alert variant="info" className="text-center">
						Votre entreprise n'est pas dans la liste ?
						<a href="mailto:tryme_2021@labeip.epitech.eu"> contactez-nous par mail.</a>
					</Alert>
					<div className="text-center">
						<Button type="submit" variant="success">
							Sauvegarder
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default UserInfoComponent;
