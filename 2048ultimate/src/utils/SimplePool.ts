/**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

function create<T>(type: { new(): T }) : T {
	type
    return new type();
}