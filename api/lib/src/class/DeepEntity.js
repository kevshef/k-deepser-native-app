import DeepAPI from "./DeepAPI";

export default class DeepEntity {
    constructor(attributes) {
        this.attributes = attributes ? attributes : {};
        this.entity = null;
        this.collectionEntity = null;
    }

    getEntity() {
        return this.entity;
    }

    getCollectionEntity() {
        return this.collectionEntity;
    }

    getData(name = null) {
        if (name == null)
            return this.attributes;

        if (this.attributes.hasOwnProperty(name))
            return this.attributes[name];

        return null;
    }

    setData(name = null, value = null) {
        if (name != null && value != null)
            this.attributes[name] = value;
        if (value == null)
            this.attributes = name;

        return this;
    };

    async load(id = '') {
        DeepAPI.getInstance().setEntity(this.getEntity());
        let data = await DeepAPI.getInstance().GET(id);
        this.setData(data);
    }

    async save() {
        if (this.getData("entity_id")) {
            DeepAPI.getInstance().setEntity(this.getEntity());
            DeepAPI.getInstance().setId(this.getData("entity_id"));
            await DeepAPI.getInstance().PUT(this.getData());
        } else {
            DeepAPI.getInstance().setEntity(this.getCollectionEntity());
            DeepAPI.getInstance().setId(null);
            await DeepAPI.getInstance().POST(this.getData());
        }

        return this;
    }

    async delete() {
        DeepAPI.getInstance().setEntity(this.getEntity());
        let data = await DeepAPI.getInstance().DELETE();
    }

    getCollection() {
        return new DeepCollection(this.constructor.name);
    }
}

export class Activity extends DeepEntity {
    constructor(props) {
        super(props);
        this.entity = 'activity/';
        this.collectionEntity = 'activites/';
    }
}

export class Ci extends DeepEntity {
    constructor(props) {
        super(props);
        this.entity = 'cmdb/ci/';
        this.collectionEntity = 'cmdb/cis/';
    }
}

export class Company extends DeepEntity {
    constructor(props) {
        super(props);
        this.entity = 'company/';
        this.collectionEntity = 'companies/';
    }
}

export class Group extends DeepEntity {
    constructor(props) {
        super(props);
        this.entity = 'group/';
        this.collectionEntity = 'groups/';
    }
}

export class Operation extends DeepEntity {
    constructor(props) {
        super(props);
        this.entity = 'service/operation/';
        this.collectionEntity = 'service/operations/';
    }
}

export class User extends DeepEntity {
    constructor(props) {
        super(props);
        this.entity = 'user/';
        this.collectionEntity = 'users/';
    }
}


class DeepCollection {
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
    page = 1;

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

    setPage(page) {
        this.page = page;
    }

    /**
     * this method allows you to add in a simple way url filters
     * @param name
     * @param value
     * @param operator
     */
    addFieldToFilter(name, value, operator = 'eq') {
        this.filters[this.filters.length] = {
            attribute: name,
            operator: operator,
            value: value
        };

    }

    getFilterParams() {
        let result = "";
        if (this.filters.length > 0) {
            for (let idx in this.filters) {
                let filterString = "";
                let filter = this.filters[idx];
                filterString += "filter[" + idx + "][attribute]=" + filter.attribute + "&filter[" + idx + "][" + filter.operator + "]=" + filter.value;
                result += (result.length > 0 ? '&' : '') + filterString;
            }
        }
        let sep = result.length > 0 ? '&' : '';
        result += sep + 'page=' + this.page;

        console.log(result);
        return result;
    }

    async loadCollection() {
        let itemsData = DeepAPI.getInstance()
            .setEntity(this.createModel().getCollectionEntity())
            .GET(null, this.getFilterParams());

        if (itemsData && itemsData.items)
            for (let index in itemsData.items) {
                this.addItem(this.createModel(itemsData.items[index]));
            }
        return itemsData;

    }
}

