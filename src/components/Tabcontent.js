import React, { useState } from 'react';

const TabContent = ({ children }) => {
    
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="tab-content">
            <ul className="tab-list">
                {React.Children.map(children, (child, index) => (
                    <li
                        key={index}
                        className={`tab ${activeTab === index ?'active' : ''}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {child.props.title}
                    </li>
                ))}
            </ul>
            <div className="tab-panel">
                {React.Children.toArray(children)[activeTab]}
            </div>
        </div>
    );
};

export default TabContent;
