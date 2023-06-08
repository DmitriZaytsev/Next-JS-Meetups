import Image from 'next/image'
import classes from './MeetupDetail.module.css';

function MeetupDetail({image, title, address, description}) {

  return (
    <section className={classes.detail}>
      <Image
        src={image}
        alt={title}
        width={650} 
        height={340}
      />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}

export default MeetupDetail;

