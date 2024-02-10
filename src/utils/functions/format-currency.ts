export function formatCurrency(value: number) {
  if (!value) return

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}