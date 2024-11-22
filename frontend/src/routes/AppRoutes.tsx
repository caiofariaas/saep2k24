import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Initial } from '../pages/Initial/Initial';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Initial />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;