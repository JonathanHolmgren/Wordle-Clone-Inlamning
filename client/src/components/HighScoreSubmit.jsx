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
        <div className={`ContainerModul ${isActive ? 'active' : ''}`}>
          <div className='contentHighScoreSubmit'>
            <h2>Congratulations</h2>
            <p>Your time was {stopTime}s</p>
            <form onSubmit={handleSubmit(handleRegistration, handleError)}>
              <div>
                <label>Enter your name </label>
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
              <button>submit game</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default HighScoreSubmit;
