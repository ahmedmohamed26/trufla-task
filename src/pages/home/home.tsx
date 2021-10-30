import React, { useState, useEffect } from 'react';
import './home.scss';
import Users from '../../interface/user';
import Interests from '../../interface/interests';
import Modal from '../../modals/delete-user/delete-user';

const Home = () => {
	const usersData = '../../api/users.json';
	const usersInterests = '../../api/interests.json';
	const [users, setUsers] = useState<Users[]>([]);
	const [userId, setUserId] = useState<number>();
	const [type, setType] = useState<string>();
	const [interests, setInterests] = useState<Interests[]>([]);
	const [isShowing, setIsShowing] = useState<boolean>(false);

	useEffect(() => {
		getInterests();
		getUsers();
	}, []);

	const reducer = (previousValue: number, currentValue: number) =>
		previousValue + currentValue;

	const getInterests = async () => {
		await fetch(usersInterests)
			.then((results) => results.json())
			.then((data) => {
				setInterests(data);
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	};

	const getFindInterset = (ids: any) => {
		if (ids) {
			let arr = interests.filter(function (interest: any) {
				return ids.indexOf(interest.id) > -1;
			});
			return arr;
		}
	};

	const getUsers = async () => {
		await fetch(usersData)
			.then((results) => results.json())
			.then((data: any) => {
				data.map(
					(user: any) => (user['following'] = user?.following.reduce(reducer))
				);
				data.sort((a: any, b: any) => b.following - a.following);
				setUsers(data);
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	};

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
										{user.interests
											? getFindInterset(user.interests)?.map(
													(item) => item.name + '  '
											  )
											: '-'}
									</td>
									<td data-column='following'>{user?.following}</td>
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
