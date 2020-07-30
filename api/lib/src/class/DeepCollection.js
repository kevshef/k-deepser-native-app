/*import DeepAPI from "./DeepAPI";
import {Activity, Ci, Company, Group, Operation, User} from "./DeepEntity";*/

/*
export default class DeepCollection {
	mainModelName = null;
	items = [];
	classMap = {
		"Company": Company,
		"Operation": Operation,
		"User": User,
		"Activity": Activity,
		"Ci": Ci,
		"Group": Group,
	};
	filters = [];

	constructor(mainModelName = null) {
		this.mainModelName = mainModelName;
	}

	[Symbol.iterator]() {
		return this.items.values();
	}

	createModel(attr = {}) {
		return new this.classMap[this.mainModelName](attr);
	}

	getItems() {
		return this.items;
	}

	addItem(items) {
		this.items.push(items);
	}

	/!**
	 * this method allows you to add in a simple way url filters
	 * @param name
	 * @param value
	 * @param operator
	 *!/
	addFieldToFilter(name, value, operator = 'eq') {
		this.filters[this.filters.length] = {
			attribute: name,
			operator: operator,
			value: value
		};

	}

	getFilterParams() {
		let result = null;
		if (this.filters.length > 0) {
			result = "";
			for (let idx in this.filters) {
				let filterString = "";
				let filter = this.filters[idx];
				filterString += "filter[" + idx + "][attribute]=" + filter.attribute + "&filter[" + idx + "][" + filter.operator + "]=" + filter.value;
				result += (result.length > 0 ? '&' : '') + filterString;
			}
		}
		return result;
	}

	loadCollection() {
		let itemsData = DeepAPI.getInstance()
			.setEntity(this.createModel().getCollectionEntity())
			.GET(null, this.getFilterParams());

		if (itemsData && itemsData.items)
			for (let index in itemsData.items) {
				this.addItem(this.createModel(itemsData.items[index]));
			}
	}
}
*/

