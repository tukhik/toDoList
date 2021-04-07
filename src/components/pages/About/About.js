import React from 'react';
import styles from './aboutStyle.module.css'; 

export default function About(props){
    return(
    	<div className="mr-auto container">
        <h1 className={styles.heading}>About us page</h1>
        <div>
        Welcome to the online documentation for ToDoList.
        Sign up and get started with ToDoList today. A world of productive work awaits!

        </div>
        <h5 className={styles.heading}>About for author</h5>
        <div>Hi. It is my first project. I’m a junior web developer and I’m looking
		for a job in IT sphere. I’m a curious, punctual and
		sociable person. I easily integrate into a new
		environment. I have an analytical mind and I
		think it will be useful for my future job. My
		advantage is my perseverance, I do not give up
		and always try to move forward. The work of a
		programmer is very interesting to me. I
		participated in several projects where I used the
		knowledge gained from the courses . I hope you
		will include me in your team. Looking forward to
		hearing from you soon! Best regards Tukhik.</div>
		</div>
    );
};