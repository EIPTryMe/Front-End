import React, { useEffect, useState } from "react";

import ChatList from '../../components/MainLayout/MyChatPage/ChatList';

import ChatUniqueList from "../../components/MainLayout/MyChatPage/ChatUniqueList";
import {useQuery} from "@apollo/react-hooks";
import {CHAT_GET_CONV} from "../../queries/chat";
import LoadingComponent from "../../components/LoadingComponent";
import {handleHttpError} from "../../utils/errorHandler";

const MyChatPage = () => {
    const {loading: isLoadingChat, error, data, refetch } = useQuery(CHAT_GET_CONV);
    if (isLoadingChat) {
        return <LoadingComponent />;
    } else if (error) {
        return handleHttpError(error);
    }
    const chat = data ? data.conversation : [];
    const number = 0;
    return (
        <div className="my-chat">
            <div className="container clearfix">
                <div className="people-list" id="people-list">
                    <div className="search">
                        <input type="text" placeholder="search"/>
                        <i className="fa fa-search"></i>
                    </div>
                    <ChatList  chat={chat} />
                </div>
                    <ChatUniqueList chat={chat} number={number} />
            </div>
        </div>
    );
};

export default MyChatPage;
