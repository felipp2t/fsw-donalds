export const removeCpfPunctuation = (cpf: string) => {
  return cpf.replace(/[\.\-]/g, '')
}

export const isValidCpf = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanedCpf = cpf.replace(/\D/g, '')

  // Verifica se o CPF tem 11 dígitos
  if (cleanedCpf.length !== 11) {
    return false
  }

  // Elimina CPFs com todos os dígitos iguais (ex: 000.000.000-00)
  if (/^(\d)\1+$/.test(cleanedCpf)) {
    return false
  }

  // Cálculo do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(cleanedCpf.charAt(i)) * (10 - i)
  }
  let firstVerifier = (sum * 10) % 11
  firstVerifier = firstVerifier === 10 ? 0 : firstVerifier

  if (firstVerifier !== Number.parseInt(cleanedCpf.charAt(9))) {
    return false
  }

  // Cálculo do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += Number.parseInt(cleanedCpf.charAt(i)) * (11 - i)
  }
  let secondVerifier = (sum * 10) % 11
  secondVerifier = secondVerifier === 10 ? 0 : secondVerifier

  return secondVerifier === Number.parseInt(cleanedCpf.charAt(10))
}
