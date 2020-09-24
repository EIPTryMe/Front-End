import React, {Component, useState} from "react";
import useAppContext from "../../../contexts/AppContext";
import MyChatPage from "../../../pages/MainLayout/MyChatPage";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {CHAT_GET_CONV, SEND_MESSAGE, GET_ALL_USER} from "../../../queries/chat";
import {NotificationManager} from "react-notifications";
import LoadingComponent from "../../LoadingComponent";
import {handleHttpError} from "../../../utils/errorHandler";



const ChatUniqueList = ({chat, number}) => {

    const context = useAppContext();
    const {user} = context.state;
    const items = [];
    const [Send_Message] = useMutation(
       SEND_MESSAGE
    );

    const [value, setValue] = useState(null);

    const on_Send_Message = (conversation_id, user_id, message, user_name) => {
        Send_Message({
            variables: { conversation_id,  message, user_id, user_name },
        })
            .then((test) => {
                console.log(test);
                NotificationManager.success("Chat", "Message envoyée");
            })
            .catch((error) => {
                NotificationManager.warning(error.message, "Message pas envoyée");
            })
    };
    const tmessage = [];
    let user_name_id = "1";
    if (user.id != 10855)
    {
        user_name_id ="IKEA";
    }
    else
    {
        user_name_id = "PABLO";
    }
    if (chat[number]) {
        chat[number].messages.forEach(conv => items.push(
            user.id != conv.user_id ?
                <li key={conv.message.id} className="clearfix">
                    <div className="message-data align-right">
                        <span className="message-data-time">"{conv.edition_date}"</span> &nbsp; &nbsp;
                        <span className="message-data-name"></span>{conv.user_name} <i
                        className="fa fa-circle me"></i>
                    </div>
                    <div className="message other-message float-right">
                        {conv.message}
                    </div>
                </li> : <li key={conv.message.id} className="clearfix">
                    <div className="message-data">
                        <span className="message-data-time">"{conv.edition_date}"</span> &nbsp; &nbsp;
                        <span className="message-data-name">{conv.user_name}</span> <i
                        className="fa fa-circle me"></i>
                    </div>
                    <div className="message my-message">
                        {conv.message}

                    </div>
                </li>
        ))
        tmessage.push(<button onClick={() => on_Send_Message(chat[0].id, user.id , value , user.name)}>Send</button>)
    }
    else
        tmessage.push(<button>Send</button>)
    console.log(chat);
    return (
        <div className="chat">
            <div className="chat-header clearfix">
                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
                     alt="&avatar"/>

                <div className="chat-about">
                    <div className="chat-with">Chat with {user_name_id }</div>
                    <div className="chat-num-messages">already 1 902 messages</div>
                </div>
                <i className="fa fa-star"></i>
            </div>

            <div className="chat-history">
                <ul>
                    {items}
                </ul>
            </div>
            <div className="chat-message clearfix">
                <textarea name="message-to-send" id="message-to-send" placeholder="Ecris ton Message" rows="3"  onChange={(e) => setValue(e.target.value)} ></textarea>
                <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
                <i className="fa fa-file-image-o"></i>
                {tmessage}
            </div>
        </div>
    )
}

export default ChatUniqueList;