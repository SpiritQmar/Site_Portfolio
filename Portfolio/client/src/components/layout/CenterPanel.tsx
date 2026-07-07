import React from "react";

const projects = [
    {
        title: "Portfolio Website",
        description:
            "Персональный сайт-портфолио разработчика с игровым интерфейсом. На котором вы сейчас сидите",
        stack: "React • TypeScript • CSS • ASP.NET Core"
    },
    {
        title: "UAMS",
        description:
            "Система анализа данных с университетов, экзаменационных вопросов",
        stack: "Python • PHP/React • XAMP(Mysql, Apache)"
    },
    {
        title: "Task Manager",
        description:
            "Приложение для управления задачами с распределением ролей.",
        stack: "React • .NET • Entity Framework"
    }
];


const CenterPanel: React.FC = () => {
    return (
        <main className="center-panel">

            <div className="projects-frame">

                <div className="projects-header">
                    PROJECTS
                </div>


                <div className="projects-scroll">

                    {projects.map((project, index) => (

                        <section
                            className="project-screen"
                            key={index}
                        >

                            <h1>
                                {project.title}
                            </h1>

                            <p className="project-description">
                                {project.description}
                            </p>


                            <div className="project-stack">
                                {project.stack}
                            </div>

                        </section>

                    ))}

                </div>

            </div>

        </main>
    );
};

export default CenterPanel;