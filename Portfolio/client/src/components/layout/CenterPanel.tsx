import React, { useEffect, useRef, useState } from "react";

const projects = [
    {
        title: "UAMS",
        description: "Система анализа данных с университетов, экзаменационных вопросов",
        stack: "Python • PHP/React • XAMP(Mysql, Apache)",
        media: { type: "video" as const, src: "/assets/media/uams-bg.mp4" }
    },
    {
        title: "Django SAI Website",
        description: "Вебсайт на джанго с тематикой ГАИ",
        stack: "Python • HTML/Django • Batch",
        media: { type: "video" as const, src: "/assets/media/sai-bg.mp4" }
    },
    {
        title: "Unity Game",
        description: "Гибридная 2d/3d игра с озвучкой, лором(сюжетом), заделом на будущие задания.",
        stack: "C# • Unity",
        media: { type: "video" as const, src: "/assets/media/unity-bg.mp4" }
    }
];

const CenterPanel: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const root = scrollRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(
            (entries) => {
                let maxRatio = 0;
                let maxIndex: number | null = null;

                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute("data-index"));
                    if (entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        maxIndex = index;
                    }
                });

                if (maxIndex !== null && maxRatio > 0) {
                    setActiveIndex(maxIndex);
                }
            },
            {
                root,
 
                rootMargin: "-45% 0px -45% 0px",
                threshold: Array.from({ length: 21 }, (_, i) => i / 20)
            }
        );

        sectionRefs.current.forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <main className="center-panel">
            <div className="projects-frame">

                {/* фоновый слой видео/картинок */}
                <div className="project-bg-layer">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className={
                                "project-bg-media" +
                                (index === activeIndex ? " project-bg-media--active" : "")
                            }
                        >
                            {project.media.type === "video" ? (
                                <video
                                    src={project.media.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <img src={project.media.src} alt="" />
                            )}
                        </div>
                    ))}
                    <div className="project-bg-overlay" />
                </div>

                <div className="projects-header">
                    Проекты
                </div>

                <div className="projects-scroll" ref={scrollRef}>
                    {projects.map((project, index) => (
                        <section
                            className="project-screen"
                            key={index}
                            data-index={index}
                            ref={(el) => { sectionRefs.current[index] = el; }}
                        >
                            <h1>{project.title}</h1>
                            <p className="project-description">{project.description}</p>
                            <div className="project-stack">{project.stack}</div>
                        </section>
                    ))}
                </div>

            </div>
        </main>
    );
};

export default CenterPanel;