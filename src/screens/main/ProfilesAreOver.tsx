import classes from "./ProfilesAreOver.module.css";


function ProfilesAreOver() {

    return (

        <div className={classes.container}>
            <h1 className={classes.title}>You’ve reached the end for now</h1>
            <span className={classes.text}> New profiles will appear here soon Check back later!</span>
        </div>

    );
}

export default ProfilesAreOver;

