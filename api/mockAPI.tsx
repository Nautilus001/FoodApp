export const mockApi = {
  fetchItems: async () =>
    new Promise(resolve =>
      setTimeout(() => resolve([{ id: 1, name: "Demo" }]), 500)
    )
};