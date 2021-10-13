import React from 'react';

import './delete-user.scss';

const Modal = (props: any) => {
	const { show, children, close, deleteUser } = props;
	return (
		<div>
			<div
				className='modal-wrapper'
				style={{
					transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
					opacity: show ? '1' : '0',
				}}>
				<div className='modal-header'>
					<h3>delete user</h3>
					<span className='close-modal-btn' onClick={close}>
						×
					</span>
				</div>
				<div className='modal-body'>
					<p>{children}</p>
				</div>
				<div className='modal-footer'>
					<button className='danger-btn' onClick={close}>
						No
					</button>
					<button className='default-btn' onClick={deleteUser}>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
