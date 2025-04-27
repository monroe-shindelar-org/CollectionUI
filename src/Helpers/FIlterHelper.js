export const FilterOperator = {
    LIKE: "LIKE",
    EQUAL: "EQUAL_TO",
};

export const FilterType = {
    SIMPLE: "SIMPLE",
    AND: "AND",
    OR: "OR"
};

export const getNameFilter = (name) => {
    const simples = [];
    simples.push(simple("name", "LIKE", name));
    simples.push(simple("name", "EQUAL_TO", name));

    const filter = or(simples);

    return filter;
}

export const and = (filters) => {
    return chain(filters, "AND");
}

export const or = (filters) => {
    return chain(filters, "OR");
}

export const simple = (field, operator, value) => {
    const filter = {
        filterType: "SIMPLE",
        filter: {
            field: field,
            operator: operator,
            value: value
        }
    };

    return filter;
}

function chain(filters, operator) {
    const filter = {
        filterType: operator,
        chain: filters
    };

    return filter;
}