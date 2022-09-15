/* eslint-disable no-unused-vars */
/* eslint-disable jest/no-conditional-expect */

import {render, screen, getNodeText, waitFor, waitForElementToBeRemoved} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {App} from './App';
import {act} from "react-dom/test-utils";

function sleep(ms){
	return new Promise(res => setTimeout(res, ms))
};

async function clickButtonWithDelay(ms, button) {
	await act(() => sleep(ms));
	act(() => { button.click()});
};

jest.setTimeout(100_000);
test("Check click", async() => {
	render(<App/>);
	const clicksCounter = screen.getByText('Count: 0');
	const button = screen.getByTestId('countButton');

	let iterationCount = 1;
	for (let i = 0; i <= 20; i++) {
		await clickButtonWithDelay(500, button);
		expect(button).toHaveStyle({backgroundColor: "yellow"});
		let countValue = getNodeText(screen.getByTestId('count'));
		let count = Number(countValue.split(" ")[1]);
		if (count === iterationCount) {
			iterationCount += 1;
		};
		if (count === 20) {
			console.log('overdrive chance not triggered')
			break
		};
		if (count === iterationCount + (iterationCount - 1)) {
			console.log(getNodeText(screen.getByTestId('overdrive')));
			await waitFor(() => {
				expect(
					screen.getByText(
						new RegExp("Overdrive: ", "i")
					)
				).toBeInTheDocument();
			});
			console.log("overdrive created");
			break
		};
	};
	await act(()=>sleep(10000));
	expect(button).toHaveStyle({backgroundColor: "green"});

	// await waitForElementToBeRemoved(() =>
	// 	screen.queryByText(
	// 		new RegExp("Overdrive: ", "i")
	// 	)
	// );
	// console.log('overdrive removed')

	let countValue = getNodeText(screen.getByTestId('count'));
	let countValueNumber = Number(countValue.split(" ")[1]);
	await act(()=>sleep(5000));
	for (let i = 0; i <= countValueNumber; i++) {
		await act(()=>sleep(1000));
		countValue = getNodeText(screen.getByTestId('count'));
		countValueNumber = Number(countValue.split(" ")[1]);
		console.log(countValueNumber);
		if( countValueNumber < 1) {
			if(countValueNumber < 0) {
				console.log('COUNT BUG:', countValueNumber)
				break
			};
			expect(clicksCounter).toHaveTextContent(`Count: 0`);
			console.log(`Count returned to 0 after ${i}sec`);
			break
		};
	};
	for (let i = 0; i <= 10; i++) {
		await clickButtonWithDelay(400, button);
	}
	await waitFor(() => {
		expect(
			screen.getByTestId('trophy')
		).toBeInTheDocument();
	});

});
