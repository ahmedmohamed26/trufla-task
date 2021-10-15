import React, { useState, useEffect } from 'react';
import './home.scss';
import Users from '../../interface/user';
import Interests from '../../interface/interests';
import { getAllUsers } from '../../service/users';
import { getAllInterests } from '../../service/interests';
import Modal from '../../modals/delete-user/delete-user';

const Home = () => {
	const [users, setUsers] = useState<Users[]>([]);
	const [userId, setUserId] = useState<number>();
	const [type, setType] = useState<string>();
	const [interests, setInterests] = useState<Interests[]>([]);
	const [isShowing, setIsShowing] = useState<boolean>(false);

	useEffect(() => {
		getUsers();
		getInterests();
	}, []);

 


	const getUsers = () => {
		getAllUsers()
			.then((res: any) => {
				setUsers(res);
		
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	};

	const getInterests = () => {
		getAllInterests()
			.then((res: any) => {
				setInterests(res);
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	};

	const reducer = (previousValue: number, currentValue: number) =>
		previousValue + currentValue;

	const openModalHandler = (id: number, type: string) => {
		setUserId(id);
		setType(type);
		setIsShowing(true);
	};

	const closeModalHandler = () => {
		setIsShowing(false);
	};

	const deletePopUp = () => {
		if (type === 'deleteUser') {
			deleteUser();
		} else {
			deleteInterests();
		}
	};

	const deleteUser = () => {
		setUsers(users.filter((item) => item.id !== userId));
		closeModalHandler();
	};

	const deleteInterests = () => {
		let user: any = {};
		user = users.find((item) => item.id === userId);
		user.interests = null;
		setUsers(users);
		closeModalHandler();
	};

	return (
		<section className='home'>
			<h1>users list</h1>
			{users.length ? (
				<table className='table'>
					<thead>
						<tr>
							<th>#</th>
							<th>name</th>
							<th>interests</th>
							<th>following</th>
							<th>actions</th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user: Users, index: number) => {
							return (
								<tr key={index}>
									<td data-column='id'>{index + 1}</td>
									<td data-column='name'>{user?.name}</td>
									<td data-column='interests'>
										{user.interests ? user.interests : '-'}
									</td>
									<td data-column='following'>
										{user?.following.reduce(reducer)}
									</td>
									<td>
										<button
											className='default-btn'
											onClick={() =>
												openModalHandler(user.id, 'deleteInterests')
											}>
											delete interests
										</button>
										<button
											className='default-btn'
											onClick={() => openModalHandler(user.id, 'deleteUser')}>
											delete user
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<h4 className='message-text'>not found users</h4>
			)}

			<Modal
				className='modal'
				show={isShowing}
				close={closeModalHandler}
				deletePopUp={deletePopUp}>
				Are you sure delete ?
			</Modal>
		</section>
	);
};

export default Home;
