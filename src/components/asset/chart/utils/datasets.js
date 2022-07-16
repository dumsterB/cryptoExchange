export function getDatasetsBorderColor({ data: { datasets }}) {
    return datasets?.[0]?.borderColor || 'black';
}