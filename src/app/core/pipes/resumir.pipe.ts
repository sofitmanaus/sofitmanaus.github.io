import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'resumir'
})
export class ResumirPipe implements PipeTransform {

    transform(pipeString: string, maximo: number, keeplast?: number): string {

        let resumido = '';
        if (!maximo) {
            resumido = pipeString;
        } else if (maximo >= pipeString.length) {
            resumido = pipeString;
        } else if (pipeString.length > maximo) {
            resumido = `${pipeString.substr(0, maximo)}...`;
            if (keeplast) {
                const start = pipeString.length - keeplast;
                const end = pipeString.length;
                const last = pipeString.substr(start, end);
                resumido = `${pipeString.substr(0, maximo)}... ${last}`;
            }
        } else {
            resumido = pipeString;
        }
        return resumido;
    }

}
