import Card from "components/card/Card";
import "./ResponseCard.css"

const ResponseCard = ({ query, smartSearchResponse }) => {
    return (
        <div className="historyCard">
            <p>{query}</p>
            <div className="cardsList">
            {smartSearchResponse.map(
                ({
                    project: { title, technologies },
                    technicalSkillSet: {
                        frontend,
                        backend,
                        databases,
                        infrastructure,
                    },
                }) => {
                    return (
                        <Card
                            key={title}
                            title={title}
                            technologies={technologies}
                            frontend={frontend}
                            backend={backend}
                            databases={databases}
                            infrastructure={infrastructure}
                        />
                    );
                }
            )}
            </div>
        </ div>)
}

export default ResponseCard