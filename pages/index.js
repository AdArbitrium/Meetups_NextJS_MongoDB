


import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';





function HomePage(props){
    return (
    <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta 
            name ='description' 
            content='Browse some neet React Next features' 
            />
        </Head>
        <MeetupList meetups={props.meetups} />
        </Fragment>
        )
}


/* export async function getServerSideProps(context){
    // fetch data from an API
    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    };
} */


export async function getStaticProps(){
    //fetch datafrom an API
    
    const client = await MongoClient.connect('mongodb+srv://REDACTED@cluster0.xmooi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();
    

    return{
        props:  {
            meetups: meetups.map( (meetup) => ({
                title : meetup.title,
                address : meetup.address,
                image : meetup.image,
                description : meetup.description,
                id : meetup._id.toString()

            }))
        },
        revalidate: 10
    };
}

export default HomePage