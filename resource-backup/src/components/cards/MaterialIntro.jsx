import React from 'react';

const MaterialIntro = (props) => {
  return (
    <div className="flex items-center justify-center flex-col max-h-[77.5vh]">
      <div
        className={`w-[90vw] h-[679px] m rounded-2xl`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/${props.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          className="h-full w-full rounded-2xl flex flex-col justify-center items-center"
          style={{
            backgroundColor: 'rgba(var(--dark-overlay-rgb), 0.7)',
          }}
        >
          <div
            className="monu capitalize text-6xl tracking-wide mobile:text-[2rem] anti-mobile:text-5xl text-center"
            style={{ color: 'var(--text-bright)' }}
          >
            {props.category}
          </div>
          <div
            className="text-2xl rounded-2xl py-3 mobile:scale-[0.8] px-12 m-4 flex text-center mobile:text-[1rem] font-bold"
            style={{
              background: 'linear-gradient(to right, var(--blue), var(--indigo))',
              color: 'var(--text-bright)',
              boxShadow: '0 4px 12px var(--box-shadow)',
            }}
          >
            {props.length} Resources Found
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialIntro;
