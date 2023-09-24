import Card from "components/card/Card";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getProjects } from "api/projects";
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true)
        const response = await getProjects("accessToken");
        const { project } = await response.json();
        setProjects(project);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="dashboard">
      {isLoading && "Loading..."}
      {!isLoading && projects.map((item) => {
        const {
          project: { title = "", technologies = "" } = {},
          technicalSkillSet: {
            frontend = "",
            backend = "",
            databases = "",
            infrastructure = "",
          } = {},
          _id,
        } = item;
        return (
          <Card
            key={_id}
            title={title}
            technologies={technologies}
            frontend={frontend}
            backend={backend}
            databases={databases}
            infrastructure={infrastructure}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
