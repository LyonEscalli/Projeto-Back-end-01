export enum DEVICE {
	NOTEBOOK="Notebook",
	DESKTOP="Desktop",
	NETBOOK="Netbook",
	SCREEN="Monitor",
	PRINTER="Impressora",
    SCANNER="scanner"
}

export enum STATEDEVICE {
	WORKING="Tem todas as partes, liga e funciona normalmente",
	NOTWORKING="Tem todas as partes, mas não liga mais",
	BROKEN="Faltam peças, funciona só as vezes ou está quebrado"
}

export type typeDevices = {
	item: DEVICE,
	state: STATEDEVICE
}
