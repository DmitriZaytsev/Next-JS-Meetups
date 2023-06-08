import { useState } from 'react';

import classes from './MeetupList.module.css';
import MeetupItem from './MeetupItem';

function MeetupList(props) {

  const [showMore, setShowMore] = useState(3);

  function handleShowMoreClick() {
    setShowMore((prevValue) => prevValue + 3);
  }
  //make shallowCopy of array and reverse it to show new meetups at first
  const showedMeetups = props.meetups.slice().reverse().slice(0, showMore);

  return (
    <>
      <ul className={classes.list}>
        {showedMeetups.map((meetup) => (
          <MeetupItem
            key={meetup.id}
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
          />
        ))}
      </ul>
      {showedMeetups.length >= showMore && (
        <div className={classes.btn__container}>
          <button onClick={handleShowMoreClick}>
            Show more
          </button>
        </div>
      )}
    </>
  );
}

export default MeetupList;
