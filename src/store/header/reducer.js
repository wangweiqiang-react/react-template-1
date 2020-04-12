import * as types from './actionsType';
const defaultState = {
	userInfo: {
		username: '佚名',
		deptName: '小吉',
	},
	menuArray: [{
		label: '默认菜单',
		type: 'default',
		menu: []
	}, {
		label: '测试菜单',
		type: 'test',
		menu: []
	}],
	menuSelected: 'default',
	menuToggle: false,
	marqueeTip: 'react-dome'
}

export default (state = defaultState, action) => {
	if (action.type === types.USER_INFO) {
		return {
			...state
		}
	} else if (action.type === types.IS_TOOGLE_MENU) {
		const newState = JSON.parse(JSON.stringify(state));
		newState.menuToggle = action.value;
		return newState
	} else if (action.type === types.CHANGE_MENU_SELECT) {
		const newState = JSON.parse(JSON.stringify(state));
		newState.menuSelected = action.value;
		return newState
	}
	return state
}