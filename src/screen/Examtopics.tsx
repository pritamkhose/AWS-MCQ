import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export interface ItemsObject {
    name: string;
    url: string;
    reply: string;
    views: string;
    username: string;
    posttime: string;
    queanshtml: string;
    que: string[];
    que_header: string;
    ans: string;
    ans_details: string;
}

interface ParamTypes {
    id: string
}

function Examtopics() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const { id } = useParams<ParamTypes>();

    useEffect(() => {
        fetch("/AWS-MCQ/examtopics-" + id + ".json")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <h5>
                    <a href={'https://www.examtopics.com/discussions/amazon/'}>  Examtopics </a>
                </h5>
                <hr />
                {[...Array(19)].map((x, i) =>
                    <React.Fragment key={i}>
                        <Link to={"/AWS-MCQ/examtopics/" + (i + 1)}>{i + 1}</Link> &nbsp;
                    </React.Fragment>
                )}
                <hr />
                {items.map((item: ItemsObject, index: number) => (
                    <div key={index}>
                        <a href={'https://www.examtopics.com' + item.url}>
                            <h4>
                                {((Number(id) - 1) * 300) + index + 1}. {item.name}
                            </h4>
                        </a>
                        <div dangerouslySetInnerHTML={{ __html: item.queanshtml.replaceAll("\n<a class=\"btn btn-primary reveal-solution\" href=\"#\">Show Suggested Answer</a>\n<a class=\"btn btn-primary hide-solution d-none\" href=\"#\">Hide Answer</a>\n<p class=\"card-text question-answer bg-light white-text\">", '') }} />
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default Examtopics;
