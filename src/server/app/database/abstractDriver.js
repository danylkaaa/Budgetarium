module.exports.get = {
    /**
     * get all documents from collection
     * @param model model to search
     * @return {Promise} result of search
     */
    all(model) {
        return model.find().exec();
    },
    /**
     * get document with that id
     * @param model model to search
     * @param id id of model
     * @return {Promise} result of search
     */
    byId(model, id) {
        return model.findById(id).exec();
    },
    /**
     * find one doc by query
     * @param model model to search
     * @param query query to search
     * @return {Promise} result of search
     */
    oneByQuery(model, query) {
        return model.findOne(query).exec();
    },
    /**
     *
     * @param model model to use
     * @param query query to search
     * @param pagination pagination options (page, limit, sort)
     * @return {*} paginated or not paginated list of entities
     */
    byQuery(model, query, pagination) {
        if (!pagination) {
            return model.find(query).exec();
        } else {
            return model.paginate(query, pagination);
        }
    }
}

/**
 * create new document
 * @param model model of new entity
 * @param data data of new doc
 * @return {Promise<any>} id of created entity
 */
module.exports.create = (model, data) => {
    let entity = new model(data);
    return new Promise((resolve, reject) => {
        entity.save((err, id) => {
            if (err) {
                reject(err);
            }
            else resolve(id);
        });
    });
}

module.exports.remove = {
    /**
     * remove doc by it's id
     * @param model model to search
     * @param id id of doc
     * @return {Promise} result of deleting
     */
    byId(model, id) {
        return model.findByIdAndRemove(id).exec();
    },
    /**
     * remove docs, by query
     * @param model model to search
     * @param query search query
     * @return {Promise|*|RegExpExecArray} result of deleting
     */
    byQuery(model, query) {
        return model.remove(query).exec();
    }
}
module.exports.update = {
    /**
     * find doc by id and update it
     * @param model model to search
     * @param id id of doc
     * @param data new data
     * @return {Promise} updated model
     */
    byId(model, id, data) {
        return model.findByIdAndUpdate(id, data).exec();
    }
}