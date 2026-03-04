import React, { useState, useEffect } from "react";
import { Card, Typography, InputNumber, Button, Space } from 'antd';

const { Title, Text } = Typography;

const Bai1: React.FC = () => {
    const [secretNumber, setSecretNumber] = useState<number>(0);
    const [attemptsLeft, setAttemptsLeft] = useState<number>(10);
    const [guess, setGuess] = useState<number | null>(null);
    const [message, setMessage] = useState<string>('Hãy bắt đầu đoán số!');
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const random = Math.floor(Math.random() * 100) + 1;

        setSecretNumber(random);
        setAttemptsLeft(10);
        setGuess(null);
        setMessage('Hãy bắt đầu đoán số!');
        setIsGameOver(false);
    };
    
    const handleGuess = () => {
        if (guess === null) {
            setMessage('Vui lòng nhập một số!');
            return;
        }
        if (isGameOver) return;
        const remaining = attemptsLeft - 1;
        setAttemptsLeft(remaining);
        if (guess < secretNumber) {
            setMessage('Bạn đoán quá thấp!');
        } 
        else if (guess > secretNumber) {
            setMessage('Bạn đoán quá cao!');
        } 
        else {
            setMessage('Chúc mừng! Bạn đã đoán đúng!');
            setIsGameOver(true);
            return;
        }if (remaining === 0) {
            setMessage(`Bạn đã hết lượt! Số đúng là ${secretNumber}`);
            setIsGameOver(true);
        }
    };
    return (
        <Card style={{ maxWidth: 600 }}>
            <Title level={3}>Game Đoán Số (1 - 100)</Title>

            <Space direction="vertical" size="large">
                <Text>Số lượt còn lại: {attemptsLeft}</Text>
                <InputNumber
                    min={1}
                    max={100}
                    value={guess}
                    onChange={(value) => setGuess(value)}
                    disabled={isGameOver}
                />
                <Space>
                    <Button 
                        type="primary" 
                        onClick={handleGuess}
                        disabled={isGameOver}
                    >
                        Đoán
                    </Button>
                    <Button onClick={startNewGame}>
                        Chơi lại
                    </Button>
                    <Text strong>{message}</Text>
                </Space>
            </Space>
        </Card>
    );
};

export default Bai1;