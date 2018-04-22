export default (fieldASTs: any): any => {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(
        (projections: any, selection: any) => {
            projections[selection.name.value] = true
            return projections
        },
        {}
    )
}