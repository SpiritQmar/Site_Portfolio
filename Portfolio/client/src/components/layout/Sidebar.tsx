import { useState } from 'react';
import '../styles/layout.css';

const stack = [
    { name: 'C#', icon: '/assets/images/icons/csharp_icon.png' },
    { name: 'Python', icon: '/assets/images/icons/python_icon.png' },
    { name: '.NET', icon: '/assets/images/icons/dotnet_icon.png' },
    { name: 'Unity', icon: '/assets/images/icons/unity_icon.png' },
    {name:"Django", icon: '/assets/images/icons/django_icon.webp' },
    
    {},
    {},
    {},
    {},
    {},
    
    {},
    {},
    {},
    {},
    {},
];

const infoSections = [
    { title: 'О себе', content: 'Мое имя Владимир, мне 22 года, я C# .NET Python разработчик' },
    { title: '', content: 'Здесь можешь описать опыт, проекты, стажировки.' },
    { title: 'Цели', content: '' },
];

function countWords(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function Sidebar() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    function toggleSection(index: number) {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar-top">
                <img src="/assets/images/avatar.png" alt="Avatar" className="avatar" />
                <img src="/assets/images/icons/junior.png" alt="Level" className="level-badge" />
            </div>
            <div className="sidebar-center">
                {infoSections.map((section, index) => {
                    const wordCount = countWords(section.content);
                    const isOpen = openIndex === index;

                    let countClass = 'empty';
                    if (wordCount > 0) {
                        countClass = isOpen ? 'active' : 'inactive';
                    }

                    return (
                        <div className="accordion-item" key={section.title}>
                            <div className="accordion-header" onClick={() => toggleSection(index)}>
                                <span className={`accordion-arrow ${isOpen ? 'open' : ''}`}>▶</span>
                                <span>{section.title}</span>
                                <span className={`word-count ${countClass}`}>({wordCount})</span>
                            </div>
                            {isOpen && (
                                <div className="accordion-content">{section.content}</div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="sidebar-stackmenu">
                {stack.map((item, index) => (
                    <div className="stack-icon" key={item.name || `empty-${index}`}>
                        {item.icon && <img src={item.icon} alt={item.name} title={item.name} />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;