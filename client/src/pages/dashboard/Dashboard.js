import Card from "components/card/Card";
import "./Dashboard.css";
import { useEffect, useState } from "react";
import { getProjects } from "api/projects";
const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects("accessToken");
        const { project } = await response.json();
        console.log(project.length);
        setProjects(project);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="dashboard">
      {projects.map((item) => {
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
        console.log(item)
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
      {/* <Card
        title="Project Title 1"
        technologies="React, Node.js, MongoDB"
        frontend="React, HTML, CSS"
        backend="Node.js, Express"
        databases="MongoDB"
        infrastructure="AWS"
      />
      <Card
        title="Project Title 1"
        technologies="React, Node.js, MongoDB"
        frontend="React, HTML, CSS"
        backend="Node.js, Express"
        databases="MongoDB"
        infrastructure="AWS"
      /> */}
    </div>
  );
};

export default Dashboard;
