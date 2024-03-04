import React from "react";
import { TestListItem } from "../types";

interface Props {
    testListItem: TestListItem
}
export default function TestListItem({testListItem}: Props) {

    const { id, title, body } = testListItem;

    return (
        <div className="test-list-item">
            <div className="test-list-item-title"> {title} </div>
            <div className="test-list-item-body"> {body} </div>

        </div>
    )
}

export {};
