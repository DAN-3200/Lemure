export function Exchange(dict, url, method) {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: method,
			credentials: 'include',
			body: JSON.stringify(dict),
			cache: 'no-cache',
			headers: new Headers({
				'content-type': 'application/json',
			}),
		})
			.then((response) => {
				if (response.status !== 200) {
					console.log('dado instável')
					return
				}
				return response.json()
			})
			.then((newData) => {
				return resolve(newData)
			})
			.catch((error) => reject(error))
	)
}
