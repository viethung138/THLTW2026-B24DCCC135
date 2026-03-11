import React, { useState } from 'react';
import { Card, Button, Typography, Space, Table } from 'antd';

const { Title } = Typography;

const choices = [ "Kéo", "Búa", "Bao"];

const Bai1 = () => {
    const [history, setHistory] = useState<any[]>([]);

    const playGame = (playerChoice: string) => {
        const computerChoice = 
            choices[Math.floor(Math.random() * 3)];
        let result = "Hòa";

        if (
            (playerChoice === 'Kéo' && computerChoice === 'Bao') ||
            (playerChoice === 'Búa' && computerChoice === 'Kéo') ||
            (playerChoice === 'Bao' && computerChoice === 'Búa')
        ) {
            result = 'Thắng';
        }   
        else if (playerChoice !== computerChoice) {
            result = 'Thua';
        }

        const newRound = {
            key: history.length + 1,
            player: playerChoice,
            computer: computerChoice,
            result: result
        };

        setHistory([...history, newRound]);
        };   
    const columns = [
        {
            title: 'Người chơi',
            dataIndex: 'player'
        },
        {
            title: 'Máy tính',
            dataIndex: 'computer'
        },
        {
            title: 'Kết quả',
            dataIndex: 'result'
        }
    ];

    return (
        <Card>
            <Title level={3}>
                Trò chơi Oẳn Tù Tì
            </Title>

            <Space>
                <Button
                    type="primary"
                    onClick={() => playGame('Kéo')}
                >
                    Kéo
                </Button>

                <Button
                    type="primary"
                    onClick={() => playGame('Búa')}
                >
                    Búa
                </Button>

                <Button
                    type="primary"
                    onClick={() => playGame('Bao')}
                >
                    Bao
                </Button>

            </Space>

            <Table
                style={{ marginTop: 20 }}
                dataSource={history}
                columns={columns}
                pagination={false}
            />

        </Card>
    );
};
export default Bai1;