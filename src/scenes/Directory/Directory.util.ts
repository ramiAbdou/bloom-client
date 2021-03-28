export const prepareMemberForFilter = (
  entity: unknown
): Record<string, unknown> => {
  const data = entity.values?.reduce(
    (acc: Record<string, unknown>, element) => {
      return { ...acc, [element?.question]: element?.value };
    },
    {}
  );

  return data;
};
