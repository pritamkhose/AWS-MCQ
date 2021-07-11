import { useEffect, useState } from "react";

export interface ItemsObject {
    name: string;
    url: string;
    ques: string;
    answer: string[];
}

function Exam4training() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("/AWS-MCQ/exam4trainingListQueAns.json")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="App">
                <h5>
                    <a href={'https://www.exam4training.com/amazon/exam-aws-solution-architect-associate-aws-certified-solutions-architect-associate/'}>  Exam4training </a>
                </h5>
                <hr />
                {items.map((item: ItemsObject, index: number) => (
                    <div key={index}>
                        <a href={item.url}>
                            <h4>
                                {index + 1}. {item.name.replaceAll("Â", "")}
                            </h4>
                        </a>
                        <div dangerouslySetInnerHTML={{ __html: item.answer[0] }} />
                        <br />
                        <div dangerouslySetInnerHTML={{ __html: item.answer[2] }} />
                        <hr />
                    </div>
                ))}
            </div>
        );
    }
}

export default Exam4training;
