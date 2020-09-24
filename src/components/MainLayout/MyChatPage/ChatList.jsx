import React, {Component} from "react";
import {useMutation, useQuery} from "@apollo/react-hooks";
import LoadingComponent from "../../LoadingComponent";
import {handleHttpError} from "../../../utils/errorHandler";
import MyChatPage from "../../../pages/MainLayout/MyChatPage";
import {CREATE_CONV, SET_USER_CONVERSATION} from "../../../queries/chat";
import {NotificationManager} from "react-notifications";
import useAppContext from "../../../contexts/AppContext";

const ChatList = ({chat, number}) => {
    const context = useAppContext();
    const {user} = context.state;
    let conversation_id = 0;
    const [create_conf] = useMutation(
        CREATE_CONV
    )
    const [set_user] = useMutation(
        SET_USER_CONVERSATION
    )
    const on_Create_User_conf = ( user_id, user_id2, objet, title) => {
        create_conf({
            variables: { objet, title},
        })
            .then((test) => {
                conversation_id = test.data.insert_conversation_one.id;
                NotificationManager.success("Création faite", "Conversation Crée");
            })
            .catch((error) => {
                NotificationManager.warning(error.message, "Problème Création");
            })
    };
    const on_Send_User_conf = (conversation_id, user_id) => {

    };
    return (
        <ul className="list">
            <li className="clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg"
                     alt="avatar"/>
                <div className="about">
                    <div className="name" onClick={() => {
                        on_Create_User_conf( user.id, 10855, "IKEA", "IKEA")
                    }}
                    > IKEA
                    </div>
                    <div className="status">
                        <i className="fa fa-circle online"></i> online
                    </div>
                </div>
            </li>
            <li className="clearfix">
                <img className="avatar" src="https://i.pinimg.com/280x280_RS/f3/fd/dd/f3fddd6f9f25e6c4423ee33d71013df5.jpg"
                     alt="avatar" />
                <div className="about">
                    <div className="name" onClick={() => {
                        on_Create_User_conf( user.id, 10855, "EIP", "EIP")
                    }}
                    > EIP
                    </div>
                    <div className="status">
                        <i className="fa fa-circle online"></i> online
                    </div>
                </div>
            </li>
            <li className="clearfix">
                <img className="avatar" src="https://eip.epitech.eu/2014/oosp/images/logo_eip.png"
                     alt="avatar"/>
                <div className="about">
                    <div className="name" onClick={() => {
                        on_Create_User_conf( user.id, 10855, "BRICO", "BRICO")
                    }}
                    > BRICO
                    </div>
                    <div className="status">
                        <i className="fa fa-circle online"></i> online
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default ChatList;