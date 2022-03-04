import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "priceSymbol",
  pure: false,
})
export class PriceSymbolPipe implements PipeTransform {
  transform(value: any, fixed?: number): any {
    fixed = fixed || 3;
    if (typeof value === "number") {
      return this.localeString(Number(value.toFixed(fixed)));
    } else {
      const tmp = Number(value);
      return this.localeString(Number(tmp.toFixed(fixed)));
    }
  }

  localeString(nStr: string | number): string {
    if (nStr === "") {
      return "";
    }
    // tslint:disable-next-line:one-variable-per-declaration
    let x, x1, x2, rgx, y1, y2;
    nStr += "";
    // @ts-ignore
    x = nStr.split(".");
    x1 = x[0];
    x2 = x.length > 1 ? "," + x[1] : "";
    rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "." + "$2");
    }
    if (x1.indexOf(",") !== -1) {
      y1 = x1.slice(x1.lastIndexOf(",")).replace(/\./g, "");

      y2 = x1.split(",");
      x = y2[0] + y1;
    } else {
      x = x1 + x2;
    }

    return x;
  }
}
