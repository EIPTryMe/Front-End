import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import useAppContext from "../../../../contexts/AppContext";

import { NotificationManager } from "react-notifications";
import { useMutation } from "@apollo/react-hooks";
import { REVIEW_CREATE } from "../../../../queries/review";

export default function SetReviewComponent({ orderItem }) {
	const [reviewForm, showReviewForm] = useState(false);
	const [reviewSent, setReviewSent] = useState(false);
	const [starValue, setStarValue] = useState(4);
	const [description, setDescription] = useState("");

	const [createReview] = useMutation(REVIEW_CREATE);

	const context = useAppContext();
	const { user } = context.state;

	const onSubmitReview = (starValue, description) => {
		const variables = {
      order_item_id: orderItem.id,
			product_id: orderItem.product.id,
			score: starValue,
			description,
			user_id: user.id,
		};
		createReview({ variables })
			.then(() => {
				setReviewSent(true);
				NotificationManager.success(`Merci pour votre avis`, "Avis validé");
			})
			.catch((error) => {
				NotificationManager.warning(error.message, "Attention");
			});
	};

	if (reviewSent) {
		const length = 40;
		const reviewDescription = description.length > length
				? description.substring(0, length - 3) + "..."
				: description;
		return (<p>{reviewDescription}</p>);
	}

	return (
		<>
			{reviewForm && (
				<>
					<div className="d-flex align-items-center">
						<ReactStars
							count={5}
							size={24}
							activeColor="#ffd700"
							value={starValue}
							isHalf={true}
							onChange={setStarValue}
						/>
						<span>Votre note: {starValue.toFixed(1)}</span>
					</div>
					<Form.Control as="textarea" rows="3" onChange={(e) => setDescription(e.target.value)} />
				</>
			)}
			{!reviewForm && (
				<Button variant="light" onClick={() => showReviewForm(true)}>
					Laisser un avis
				</Button>
			)}
			{reviewForm && (
				<>
					<Button
						variant="success"
						onClick={() => onSubmitReview(starValue, description)}
						className="mt-2"
					>
						Confirmer
					</Button>
					<Button variant="danger" onClick={() => showReviewForm(false)} className="mt-2 ml-2">
						Annuler
					</Button>
				</>
			)}
		</>
	);
}
