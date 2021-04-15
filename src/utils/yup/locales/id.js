/* eslint-disable no-useless-concat */
/*eslint-disable no-template-curly-in-string*/
import printValue from 'yup/es/util/printValue';

export var mixed = {
  default: '${path} tidak sesuai',
  required: '${path} tidak boleh kosong',
  oneOf: '${path} harus berupa salah satu dari: ${values}',
  notOneOf: '${path} tidak boleh berupa: ${values}',
  notType: function notType(_ref) {
    var path = _ref.path,
        type = _ref.type,
        value = _ref.value,
        originalValue = _ref.originalValue;
    var isCast = originalValue != null && originalValue !== value;
    var msg = path + " harus berupa `" + type + "`, " + ("tetapi nilai akhirnya berupa: `" + printValue(value, true) + "`") + (isCast ? " (dibentuk dari nilai `" + printValue(originalValue, true) + "`)." : '.');

    if (value === null) {
      msg += "\n Jika \"null\" dimaksudkan untuk nilai kosong, pastikan schema telah ditambahkan `.nullable()`";
    }

    return msg;
  },
  defined: '${path} harus didefinisikan'
};
export var string = {
  length: '${path} harus sepanjang ${length} karakter',
  min: '${path} minimal ${min} karakter',
  max: '${path} paling banyak ${max} karakter',
  matches: '${path} harus memenuhi bentuk: "${regex}"',
  email: '${path} harus berupa email',
  url: '${path} harus berupa URL',
  uuid: '${path} harus berupa UUID',
  trim: '${path} tidak boleh ada spasi di awal atau akhir isian',
  lowercase: '${path} harus berupa huruf kecil semua',
  uppercase: '${path} harus berupa huruf besar semua'
};
export var number = {
  min: '${path} nilai minimal adalah ${min}',
  max: '${path} nilai maksimal adalah ${max}',
  lessThan: '${path} harus kudang dari ${less}',
  moreThan: '${path} harus lebih dari ${more}',
  notEqual: '${path} tidak boleh bernilai ${notEqual}',
  positive: '${path} nilai harus positif',
  negative: '${path} nilai harus negatif',
  integer: '${path} harus berupa integer'
};
export var date = {
  min: '${path} nilai paling lambat adalah ${min}',
  max: '${path} nilai paling cepat adalah ${max}'
};
export var boolean = {};
export var object = {
  noUnknown: '${path} nilai dari properti ${unknown} tidak ditemukan'
};
export var array = {
  min: '${path} paling sedikit berjumlah ${min} isian',
  max: '${path} paling banyak berjumlah ${max} isian'
};
export default {
  mixed: mixed,
  string: string,
  number: number,
  date: date,
  object: object,
  array: array,
  boolean: boolean
};