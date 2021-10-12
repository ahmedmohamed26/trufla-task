import React, { useState, useEffect } from 'react';
import './home.scss';
import { getAllUsers } from '../../service/users';
import Users from '../../interface/user';

const Home = () => {
	const [users, setUsers] = useState<Users[]>([]);
	useEffect(() => {
		getUsers();
	}, []);

	function getUsers() {
		getAllUsers()
			.then((res: any) => {
				setUsers(res);
				console.log(res);
			})
			.catch((error: any) => {
				throw new Error(error.message);
			});
	}
	return (
        <section className='home'>
            <h1>users table</h1>
			<table className="table">
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
                {users?.map((user: Users,index:number) => {
                    return (
                        <tr key={index}>
						<td data-column='id'>{index + 1}</td>
						<td data-column='name'>{user?.name}</td>
						<td data-column='interests'>{user?.interests}</td>
						<td data-column='following'>{user?.following}</td>
						<td><button>delete</button></td>
                    </tr>
                    )
				})}
					
				</tbody>
			</table>
		</section>
	);
};

export default Home;
