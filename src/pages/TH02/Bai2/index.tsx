import { Tabs, Card } from 'antd';

import KnowledgeManager from './components/KnowledgeManager';
import SubjectManager from './components/SubjectManager';
import QuestionManager from './components/QuestionManager';
import ExamManager from './components/ExamManager';

const { TabPane } = Tabs;

const Bai2 = () => {

    return (

        <Card>

            <Tabs defaultActiveKey="1">

                <TabPane tab="Khối kiến thức" key="1">
                    <KnowledgeManager />
                </TabPane>

                <TabPane tab="Môn học" key="2">
                    <SubjectManager />
                </TabPane>

                <TabPane tab="Câu hỏi" key="3">
                    <QuestionManager />
                </TabPane>

                <TabPane tab="Đề thi" key="4">
                    <ExamManager />
                </TabPane>

            </Tabs>

        </Card>

    );
};

export default Bai2;