 /**
 * Created By Lu Yao
 * 
 * 2018-04-01
 */

 class CommonPools {
	
// 	static private typePools:[string,Object];

// 	static public get<T> () : CommonPool<T> {
// 		ReflectionPool pool = typePools.get(type);
// 		if (pool == null) {
// 			pool = new ReflectionPool(type, 4, 100);
// 			typePools.put(type, pool);
// 		}
// 		return pool;
// 	}
	
// //	public static void pint() {
// //		Keys<Class> keys = typePools.keys();
// //		for(Class clazz : keys) {
// //			MyLog.log("pool",clazz.getName() + "           " + typePools.get(clazz).count);
// //		}
// //		MyLog.log("-----------------------------------------------------------------------------------------");
// //	}

// 	/** Obtains an object from the {@link #get(Class) pool}. */
// 	static public <T> T obtain (Class<T> type) {
// 		return (T)get(type).obtain();
// 	}

// 	/** Frees an object from the {@link #get(Class) pool}. */
// 	static public void free (Object object) {
// 		if (object == null) throw new IllegalArgumentException("object cannot be null.");
// 		ReflectionPool pool = typePools.get(object.getClass());
// 		if (pool == null) return; // Ignore freeing an object that was never retained.
// 		pool.free(object);
// 	}

// 	/** Frees the specified objects from the {@link #get(Class) pool}. Null objects within the array are silently ignored. Object
// 	 * don't need to be from the same pool. */
// 	static public void freeAll (Array objects) {
// 		if (objects == null) throw new IllegalArgumentException("objects cannot be null.");
// 		for (int i = 0, n = objects.size; i < n; i++) {
// 			Object object = objects.get(i);
// 			if (object == null) continue;
// 			ReflectionPool pool = typePools.get(object.getClass());
// 			if (pool == null) continue; // Ignore freeing an object that was never retained.
// 			pool.free(object);
// 		}
// 	}

// 	private Pools () {
// 	}
}
