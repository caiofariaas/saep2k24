import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Apenas Estruturado!

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="inicial" element={<Initial />}>
                    <Route index element={<Dashboards />} />
                    <Route path='mapa' element={<Map />} />
                    <Route path='coleta_de_dados' element={<Collect />} />
                    <Route path='pontos_de_coleta' element={<PointCollect />} />
                    <Route path='historico' element={<Historic />} />
                    <Route path='exportar_excel' element={<ExportExcel />} />
                    <Route path='ultimas_atividades' element={<LastActivities />} />
                    <Route path='consumo_de_agua' element={<WaterConsumption />} />

                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;