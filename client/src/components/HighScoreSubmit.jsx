import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import '../styles/HighScoreSubmit.css';

function HighScoreSubmit({ stopTime, submitHighscore }) {
  const [isActive, setIsActive] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleRegistration = (formData) => {
    submitHighscore(formData);
    setIsActive(false);
  };

  const handleError = (errors) => {};

  const registerOptions = {
    username: { required: 'Player name cannot be blank' },
  };

  return (
    <>
      <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
        <div className={`ContainerEnterPlayer ${isActive ? 'active' : ''}`}>
          <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <div>
              <label>Player name </label>
              <input
                name='username'
                type='text'
                {...register('username', registerOptions.username)}
              />
              <small
                className='text-danger'
                style={{ opacity: errors?.username ? 1 : 0 }}
              >
                {errors?.username && errors.username.message}
              </small>
            </div>
            <p>Your time was {stopTime}</p>
            <button>submit game</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default HighScoreSubmit;
