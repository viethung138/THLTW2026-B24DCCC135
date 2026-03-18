import React, { useState } from "react";
import { Input, Button, Select, Rate } from "antd";
import { Review, Appointment } from "../types";

interface Props {
    appointments: Appointment[];
    reviews: Review[];
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const ReviewManager: React.FC<Props> = ({ appointments, reviews, setReviews }) => {

    const [apptId, setApptId] = useState<string>();
    const [text, setText] = useState("");
    const [rating, setRating] = useState(5);

    const done = appointments.filter(a => a.status === "done");

    const add = () => {
        if (!apptId) return;
        setReviews([...reviews, {
            id: Date.now().toString(),
            appointmentId: apptId,
            rating,
            comment: text
        }]);
    };

    const reply = (id: string, t: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, reply: t } : r));
    };

    return (
        <>
            <Select style={{width:200}} onChange={setApptId}>
                {done.map(a => <Select.Option key={a.id}>{a.date}</Select.Option>)}
            </Select>

            <Rate onChange={setRating}/>
            <Input onChange={(e)=>setText(e.target.value)} placeholder="Nhận xét"/>
            <Button onClick={add}>Gửi</Button>

            {reviews.map(r => (
                <div key={r.id}>
                    ⭐{r.rating} - {r.comment}
                    <Input placeholder="Reply" onPressEnter={(e:any)=>reply(r.id,e.target.value)}/>
                    <div>{r.reply}</div>
                </div>
            ))}
        </>
    );
};

export default ReviewManager;