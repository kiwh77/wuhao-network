import Axios from 'axios';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var Reflect$1;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof commonjsGlobal === "object" ? commonjsGlobal :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect$1 || (Reflect$1 = {}));

function getType(obj) {
    var _a = toString.apply(obj).match(/^\[object (\w*)\]$/) || [], type = _a[1];
    return type;
}
function isObject(obj) {
    return obj && getType(obj) === 'Object';
}
function isArray(obj) {
    return obj && getType(obj) === 'Array';
}
function isString(obj) {
    return obj && getType(obj) === 'String';
}
function isFunction(obj) {
    return obj && getType(obj) === 'Function';
}

function isService(obj) {
    return isObject(obj) && 'name' in obj && 'url' in obj && 'method' in obj;
}
var ServiceStack = /** @class */ (function () {
    function ServiceStack(props) {
        this.sources = [];
        if (props && props.services && props.services.length) {
            this.sources = props.services.reduce(function (total, item) {
                var service = transformService(item);
                if (service)
                    total.push(service);
                return total;
            }, []);
        }
    }
    ServiceStack.prototype.register = function (service) {
        var s = transformService(service);
        if (s)
            this.sources.push(s);
    };
    ServiceStack.prototype.find = function (name) {
        return this.sources.find(function (item) { return item.name === name; });
    };
    return ServiceStack;
}());
function transformService(params) {
    var service;
    if (isService(params))
        service = params;
    if (isArray(params)) {
        var _a = params, name_1 = _a[0], method = _a[1], url = _a[2], advance = _a[3];
        if (!name_1 || !method || !url)
            return;
        service = __assign({ name: name_1, method: method, url: url }, (isObject(advance) ? advance : {}));
    }
    return service;
}

function UpperFirstWord(str) {
    if (!str || !isString(str) || str.length === 0)
        return str;
    return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
}

var BaseProcessor = /** @class */ (function () {
    function BaseProcessor() {
        this.name = 'base';
        var originHandle = this.handle;
        this.handle = function (ctx, env) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var middlewares, beforeName, beforeMiddlewares, result, afterName, afterMiddlewares;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            middlewares = (_a = ctx.service) === null || _a === void 0 ? void 0 : _a.middleware;
                            if (!middlewares || middlewares.length === 0) {
                                return [2 /*return*/, originHandle.call(this, ctx, env)];
                            }
                            beforeName = 'before' + UpperFirstWord(this.name);
                            env.emitter.emit(beforeName, { name: this.name, ctx: ctx });
                            beforeMiddlewares = middlewares.reduce(function (total, middleware) {
                                if (typeof middleware === 'string') {
                                    var midInstance = env.middleware.find(middleware);
                                    if (midInstance && midInstance.at === beforeName)
                                        total.push(midInstance);
                                }
                                else if (middleware.at === beforeName) {
                                    total.push(middleware);
                                }
                                return total;
                            }, []);
                            if (!(beforeMiddlewares.length > 0)) return [3 /*break*/, 2];
                            return [4 /*yield*/, env.pipe.exec(beforeMiddlewares, ctx, env)];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2: return [4 /*yield*/, originHandle.call(this, ctx, env)];
                        case 3:
                            result = _b.sent();
                            afterName = 'after' + UpperFirstWord(this.name);
                            afterMiddlewares = middlewares.reduce(function (total, middleware) {
                                if (typeof middleware === 'string') {
                                    var midInstance = env.middleware.find(middleware);
                                    if (midInstance && midInstance.at === afterName)
                                        total.push(midInstance);
                                }
                                else {
                                    if (middleware.at === afterName)
                                        total.push(middleware);
                                }
                                return total;
                            }, []);
                            if (!(afterMiddlewares.length > 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, env.pipe.exec(afterMiddlewares, ctx, env)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            env.emitter.emit(beforeName, { name: this.name, ctx: ctx });
                            return [2 /*return*/, result];
                    }
                });
            });
        }.bind(this);
    }
    BaseProcessor.prototype.handle = function (ctx, env) { };
    return BaseProcessor;
}());

var UniqueError = /** @class */ (function (_super) {
    __extends(UniqueError, _super);
    function UniqueError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'UniqueError';
        return _this;
    }
    return UniqueError;
}(Error));
var UniqueProcessor = /** @class */ (function (_super) {
    __extends(UniqueProcessor, _super);
    function UniqueProcessor(props) {
        var _this = _super.call(this) || this;
        _this.name = 'unique';
        _this.interval = 0;
        _this.interval = props.interval;
        return _this;
    }
    UniqueProcessor.prototype.handle = function (ctx, env) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (env.bucket.verify(ctx.id, this.interval))
                    return [2 /*return*/];
                return [2 /*return*/, new UniqueError(ctx.service.name || ctx.service.url)];
            });
        });
    };
    return UniqueProcessor;
}(BaseProcessor));

var ConfigProcessor = /** @class */ (function (_super) {
    __extends(ConfigProcessor, _super);
    function ConfigProcessor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'config';
        return _this;
    }
    ConfigProcessor.prototype.handle = function (ctx, env) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, remain, service;
            return __generator(this, function (_b) {
                _a = ctx.initParams, name = _a.name, remain = __rest(_a, ["name"]);
                if (name && isString(name)) {
                    service = env.service.find(name);
                    ctx.service = service;
                    ctx.params = __assign(__assign({}, service.default), ctx.params);
                }
                else if (remain.url) {
                    ctx.params = __assign({ method: remain.method || 'get' }, remain);
                }
                else {
                    return [2 /*return*/, new Error('service not config!')];
                }
                ctx.params = remain;
                ctx.id = env.bucket.getId(ctx.params);
                _super.prototype.handle.call(this, ctx, env);
                return [2 /*return*/];
            });
        });
    };
    return ConfigProcessor;
}(BaseProcessor));

/**
 * 转换path参数
 * @param url 需要转换的url
 * @param params 参数
 */
function transformPathParams(url, path) {
    if (path === void 0) { path = {}; }
    var urlComponents = url.split('/');
    return urlComponents
        .map(function (component) {
        if (new RegExp('^:').test(component) &&
            path[component.replace(':', '')]) {
            return path[component.replace(':', '')];
        }
        return component;
    })
        .join('/');
}

var RequestProcessor = /** @class */ (function (_super) {
    __extends(RequestProcessor, _super);
    function RequestProcessor(props) {
        var _this = _super.call(this) || this;
        _this.name = 'request';
        _this.axiosInstance = Axios.create(props);
        return _this;
    }
    RequestProcessor.prototype.handle = function (ctx, env) {
        return __awaiter(this, void 0, void 0, function () {
            var id, ctxParams, config, url, path, method, params, body, cancel, requestParams, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = ctx.id, ctxParams = ctx.params, config = ctx.config;
                        url = ctxParams.url, path = ctxParams.path, method = ctxParams.method, params = ctxParams.params, body = ctxParams.body, cancel = ctxParams.cancel;
                        requestParams = __assign({ url: url, method: method }, config);
                        if (id) {
                            requestParams.cancelToken = new Axios.CancelToken(function (cancelFunction) {
                                ctx.cancel = cancelFunction;
                                if (cancel && typeof cancel === 'function')
                                    cancel(cancelFunction, id);
                            });
                        }
                        if (path)
                            requestParams.url = transformPathParams(url, path);
                        switch (method.toLowerCase()) {
                            case 'get':
                                if (params) {
                                    requestParams.params = params;
                                }
                                break;
                            case 'put':
                                if (body) {
                                    requestParams.data = body;
                                }
                                break;
                        }
                        _a = ctx;
                        return [4 /*yield*/, this.axiosInstance.request(requestParams)];
                    case 1:
                        _a.response = _b.sent();
                        env.bucket.pop(ctx.id);
                        return [2 /*return*/];
                }
            });
        });
    };
    return RequestProcessor;
}(BaseProcessor));

var ProcessorStack = /** @class */ (function () {
    function ProcessorStack(props) {
        this.sources = [];
        var _a = props || {}, interval = _a.interval, requesterConfig = _a.requesterConfig;
        var processors = [];
        // 配置处理
        processors.push(new ConfigProcessor());
        // 去重处理
        if (interval > 0) {
            processors.push(new UniqueProcessor({ interval: interval }));
        }
        // 请求处理
        if (typeof window === 'object') {
            processors.push(new RequestProcessor(requesterConfig));
        }
        else {
            throw new Error('not support current system env!');
        }
        this.sources = processors;
    }
    ProcessorStack.prototype.push = function (processor) {
        this.sources.push(processor);
        return this;
    };
    ProcessorStack.prototype.before = function (index, processor) {
        var idx = this._getIndex(index);
        if (idx === 0) {
            this.sources.unshift(processor);
        }
        else {
            this.sources.splice(idx, 0, processor);
        }
        return this;
    };
    ProcessorStack.prototype.after = function (index, processor) {
        var idx = this._getIndex(index);
        this.sources.splice(idx === 0 ? 1 : idx + 1, 0, processor);
        return this;
    };
    ProcessorStack.prototype.replace = function (index, processor) {
        var idx = this._getIndex(index);
        this.sources[idx] = processor;
        return this;
    };
    ProcessorStack.prototype.remove = function (index) {
        var idx = this._getIndex(index);
        this.sources.splice(idx, 1);
        return this;
    };
    ProcessorStack.prototype._getIndex = function (index) {
        return typeof index === 'number'
            ? Math.floor(index)
            : this.sources.findIndex(function (item) { return item.name === index; });
    };
    ProcessorStack.prototype.register = function (processor) {
        this.sources.push(processor);
    };
    return ProcessorStack;
}());

var MiddlewareStack = /** @class */ (function () {
    function MiddlewareStack(props) {
        var _a;
        this.sources = [];
        if (((_a = props === null || props === void 0 ? void 0 : props.middlewares) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            this.sources = props.middlewares.filter(this.verify);
        }
    }
    MiddlewareStack.prototype.register = function (middleware) {
        if (this.verify(middleware)) {
            this.sources.push(middleware);
            return middleware.name;
        }
    };
    MiddlewareStack.prototype.verify = function (mid) {
        return (mid === null || mid === void 0 ? void 0 : mid.at) && (mid === null || mid === void 0 ? void 0 : mid.name) && (mid === null || mid === void 0 ? void 0 : mid.handle) && isFunction(mid.handle);
    };
    MiddlewareStack.prototype.find = function (name) {
        return this.sources.find(function (mid) { return mid.name === name; });
    };
    return MiddlewareStack;
}());

function md5(a) {
  function b(a, b) {
    return (a << b) | (a >>> (32 - b))
  }

  function c(a, b) {
    var c, d, e, f, g;
    return (
      (e = 2147483648 & a),
      (f = 2147483648 & b),
      (c = 1073741824 & a),
      (d = 1073741824 & b),
      (g = (1073741823 & a) + (1073741823 & b)),
      c & d
        ? 2147483648 ^ g ^ e ^ f
        : c | d
        ? 1073741824 & g
          ? 3221225472 ^ g ^ e ^ f
          : 1073741824 ^ g ^ e ^ f
        : g ^ e ^ f
    )
  }

  function d(a, b, c) {
    return (a & b) | (~a & c)
  }

  function e(a, b, c) {
    return (a & c) | (b & ~c)
  }

  function f(a, b, c) {
    return a ^ b ^ c
  }

  function g(a, b, c) {
    return b ^ (a | ~c)
  }

  function h(a, e, f, g, h, i, j) {
    return (a = c(a, c(c(d(e, f, g), h), j))), c(b(a, i), e)
  }

  function i(a, d, f, g, h, i, j) {
    return (a = c(a, c(c(e(d, f, g), h), j))), c(b(a, i), d)
  }

  function j(a, d, e, g, h, i, j) {
    return (a = c(a, c(c(f(d, e, g), h), j))), c(b(a, i), d)
  }

  function k(a, d, e, f, h, i, j) {
    return (a = c(a, c(c(g(d, e, f), h), j))), c(b(a, i), d)
  }

  function l(a) {
    for (
      var b,
        c = a.length,
        d = c + 8,
        e = (d - (d % 64)) / 64,
        f = 16 * (e + 1),
        g = new Array(f - 1),
        h = 0,
        i = 0;
      c > i;

    )
      (b = (i - (i % 4)) / 4),
        (h = (i % 4) * 8),
        (g[b] = g[b] | (a.charCodeAt(i) << h)),
        i++;
    return (
      (b = (i - (i % 4)) / 4),
      (h = (i % 4) * 8),
      (g[b] = g[b] | (128 << h)),
      (g[f - 2] = c << 3),
      (g[f - 1] = c >>> 29),
      g
    )
  }

  function m(a) {
    var b,
      c,
      d = '',
      e = '';
    for (c = 0; 3 >= c; c++)
      (b = (a >>> (8 * c)) & 255),
        (e = '0' + b.toString(16)),
        (d += e.substr(e.length - 2, 2));
    return d
  }

  function n(a) {
    a = a.replace(/\r\n/g, '\n');
    for (var b = '', c = 0; c < a.length; c++) {
      var d = a.charCodeAt(c);
      128 > d
        ? (b += String.fromCharCode(d))
        : d > 127 && 2048 > d
        ? ((b += String.fromCharCode((d >> 6) | 192)),
          (b += String.fromCharCode((63 & d) | 128)))
        : ((b += String.fromCharCode((d >> 12) | 224)),
          (b += String.fromCharCode(((d >> 6) & 63) | 128)),
          (b += String.fromCharCode((63 & d) | 128)));
    }
    return b
  }

  var o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x = [],
    y = 7,
    z = 12,
    A = 17,
    B = 22,
    C = 5,
    D = 9,
    E = 14,
    F = 20,
    G = 4,
    H = 11,
    I = 16,
    J = 23,
    K = 6,
    L = 10,
    M = 15,
    N = 21;
  for (
    a = n(a),
      x = l(a),
      t = 1732584193,
      u = 4023233417,
      v = 2562383102,
      w = 271733878,
      o = 0;
    o < x.length;
    o += 16
  )
    (p = t),
      (q = u),
      (r = v),
      (s = w),
      (t = h(t, u, v, w, x[o + 0], y, 3614090360)),
      (w = h(w, t, u, v, x[o + 1], z, 3905402710)),
      (v = h(v, w, t, u, x[o + 2], A, 606105819)),
      (u = h(u, v, w, t, x[o + 3], B, 3250441966)),
      (t = h(t, u, v, w, x[o + 4], y, 4118548399)),
      (w = h(w, t, u, v, x[o + 5], z, 1200080426)),
      (v = h(v, w, t, u, x[o + 6], A, 2821735955)),
      (u = h(u, v, w, t, x[o + 7], B, 4249261313)),
      (t = h(t, u, v, w, x[o + 8], y, 1770035416)),
      (w = h(w, t, u, v, x[o + 9], z, 2336552879)),
      (v = h(v, w, t, u, x[o + 10], A, 4294925233)),
      (u = h(u, v, w, t, x[o + 11], B, 2304563134)),
      (t = h(t, u, v, w, x[o + 12], y, 1804603682)),
      (w = h(w, t, u, v, x[o + 13], z, 4254626195)),
      (v = h(v, w, t, u, x[o + 14], A, 2792965006)),
      (u = h(u, v, w, t, x[o + 15], B, 1236535329)),
      (t = i(t, u, v, w, x[o + 1], C, 4129170786)),
      (w = i(w, t, u, v, x[o + 6], D, 3225465664)),
      (v = i(v, w, t, u, x[o + 11], E, 643717713)),
      (u = i(u, v, w, t, x[o + 0], F, 3921069994)),
      (t = i(t, u, v, w, x[o + 5], C, 3593408605)),
      (w = i(w, t, u, v, x[o + 10], D, 38016083)),
      (v = i(v, w, t, u, x[o + 15], E, 3634488961)),
      (u = i(u, v, w, t, x[o + 4], F, 3889429448)),
      (t = i(t, u, v, w, x[o + 9], C, 568446438)),
      (w = i(w, t, u, v, x[o + 14], D, 3275163606)),
      (v = i(v, w, t, u, x[o + 3], E, 4107603335)),
      (u = i(u, v, w, t, x[o + 8], F, 1163531501)),
      (t = i(t, u, v, w, x[o + 13], C, 2850285829)),
      (w = i(w, t, u, v, x[o + 2], D, 4243563512)),
      (v = i(v, w, t, u, x[o + 7], E, 1735328473)),
      (u = i(u, v, w, t, x[o + 12], F, 2368359562)),
      (t = j(t, u, v, w, x[o + 5], G, 4294588738)),
      (w = j(w, t, u, v, x[o + 8], H, 2272392833)),
      (v = j(v, w, t, u, x[o + 11], I, 1839030562)),
      (u = j(u, v, w, t, x[o + 14], J, 4259657740)),
      (t = j(t, u, v, w, x[o + 1], G, 2763975236)),
      (w = j(w, t, u, v, x[o + 4], H, 1272893353)),
      (v = j(v, w, t, u, x[o + 7], I, 4139469664)),
      (u = j(u, v, w, t, x[o + 10], J, 3200236656)),
      (t = j(t, u, v, w, x[o + 13], G, 681279174)),
      (w = j(w, t, u, v, x[o + 0], H, 3936430074)),
      (v = j(v, w, t, u, x[o + 3], I, 3572445317)),
      (u = j(u, v, w, t, x[o + 6], J, 76029189)),
      (t = j(t, u, v, w, x[o + 9], G, 3654602809)),
      (w = j(w, t, u, v, x[o + 12], H, 3873151461)),
      (v = j(v, w, t, u, x[o + 15], I, 530742520)),
      (u = j(u, v, w, t, x[o + 2], J, 3299628645)),
      (t = k(t, u, v, w, x[o + 0], K, 4096336452)),
      (w = k(w, t, u, v, x[o + 7], L, 1126891415)),
      (v = k(v, w, t, u, x[o + 14], M, 2878612391)),
      (u = k(u, v, w, t, x[o + 5], N, 4237533241)),
      (t = k(t, u, v, w, x[o + 12], K, 1700485571)),
      (w = k(w, t, u, v, x[o + 3], L, 2399980690)),
      (v = k(v, w, t, u, x[o + 10], M, 4293915773)),
      (u = k(u, v, w, t, x[o + 1], N, 2240044497)),
      (t = k(t, u, v, w, x[o + 8], K, 1873313359)),
      (w = k(w, t, u, v, x[o + 15], L, 4264355552)),
      (v = k(v, w, t, u, x[o + 6], M, 2734768916)),
      (u = k(u, v, w, t, x[o + 13], N, 1309151649)),
      (t = k(t, u, v, w, x[o + 4], K, 4149444226)),
      (w = k(w, t, u, v, x[o + 11], L, 3174756917)),
      (v = k(v, w, t, u, x[o + 2], M, 718787259)),
      (u = k(u, v, w, t, x[o + 9], N, 3951481745)),
      (t = c(t, p)),
      (u = c(u, q)),
      (v = c(v, r)),
      (w = c(w, s));
  var O = m(t) + m(u) + m(v) + m(w);
  return O.toLowerCase()
}

var Bucket = /** @class */ (function () {
    function Bucket() {
        this.requests = {};
    }
    Bucket.prototype.getId = function (service) {
        var url = service.url, method = service.method, params = service.params, path = service.path, body = service.body;
        return this._getId({
            url: url,
            method: method,
            params: params,
            path: path,
            body: body
        });
    };
    Bucket.prototype.verify = function (id, interval) {
        var request = this.requests[id];
        if ((request === null || request === void 0 ? void 0 : request.timestamp) + interval > Date.now())
            return false;
        this.requests[id] = {
            timestamp: Date.now()
        };
        return id;
    };
    Bucket.prototype.pop = function (id) {
        delete this.requests[id];
    };
    Bucket.prototype._getId = function (params) {
        return md5(Object.keys(params)
            .sort()
            .map(function (item) {
            var value = params[item];
            var transformResult;
            if (typeof value === 'object') {
                try {
                    transformResult = JSON.stringify(value);
                }
                catch (_a) { }
            }
            else {
                transformResult = "".concat(item, "=").concat(value);
            }
            return transformResult;
        })
            .join('&'));
    };
    return Bucket;
}());

/**
 * 请求事件处理器
 */
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.events = {};
    }
    Emitter.prototype.on = function (event, func) {
        if (!event || !func)
            return;
        var handlers = this.events[event];
        if (!handlers) {
            this.events[event] = [func];
        }
        else {
            handlers.push(func);
        }
    };
    Emitter.prototype.off = function (event, func) {
        if (!event)
            return;
        var handlers = this.events[event];
        if (!handlers)
            return;
        var index = handlers.indexOf(func);
        if (index > -1) {
            handlers.splice(index, 1);
        }
        else {
            this.events[event] = [];
        }
    };
    Emitter.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this.events[event] || [];
        handlers.forEach(function (handler) {
            if (handler)
                handler.apply(void 0, args);
        });
    };
    return Emitter;
}());

var Pipeline = /** @class */ (function () {
    function Pipeline() {
    }
    Pipeline.prototype.exec = function (handlers, ctx, env) {
        return __awaiter(this, void 0, void 0, function () {
            function dispatch(index) {
                return __awaiter(this, void 0, void 0, function () {
                    var processor, error;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (index >= handlers.length)
                                    return [2 /*return*/];
                                processor = handlers[index];
                                ctx.step = processor.name;
                                return [4 /*yield*/, processor.handle(ctx, env)];
                            case 1:
                                error = _a.sent();
                                if (error)
                                    throw error;
                                return [4 /*yield*/, dispatch(index + 1)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, dispatch(0)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ctx.response];
                }
            });
        });
    };
    return Pipeline;
}());

var Context = /** @class */ (function () {
    function Context(props) {
        this.initParams = props;
    }
    return Context;
}());

var WuhaoNetwork = /** @class */ (function () {
    function WuhaoNetwork(props) {
        this.pipe = new Pipeline();
        this.bucket = new Bucket();
        this.emitter = new Emitter();
        this.processor = new ProcessorStack(props);
        this.service = new ServiceStack(props);
        this.middleware = new MiddlewareStack(props);
    }
    WuhaoNetwork.prototype.send = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.pipe.exec(this.processor.sources, new Context(options), {
                                pipe: this.pipe,
                                bucket: this.bucket,
                                emitter: this.emitter,
                                service: this.service,
                                processor: this.processor,
                                middleware: this.middleware
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 快速发起get请求
     * @param url
     * @param options
     */
    WuhaoNetwork.prototype.get = function (url, options) {
        return this.send(__assign(__assign({}, options), { method: 'get', url: url }));
    };
    WuhaoNetwork.prototype.post = function (url, options) {
        return this.send(__assign(__assign({}, options), { method: 'post', url: url }));
    };
    WuhaoNetwork.prototype.put = function (url, options) {
        return this.send(__assign(__assign({}, options), { method: 'put', url: url }));
    };
    WuhaoNetwork.prototype.delete = function (url, options) {
        return this.send(__assign(__assign({}, options), { method: 'delete', url: url }));
    };
    WuhaoNetwork.prototype.patch = function (url, options) {
        return this.send(__assign(__assign({}, options), { method: 'patch', url: url }));
    };
    WuhaoNetwork.prototype.install = function (app) {
        if (app.config && app.config.globalProperties) {
            app.config.globalProperties.$http = this;
        }
        else if (app.constructor) {
            app.prototype.$http = this;
        }
    };
    return WuhaoNetwork;
}());
var SERVICE_FLAG = Symbol('service');
var MIDDLEWARE_FLAG = Symbol('middleware');
/**
 * 初始化
 * @param props 初始化参数
 * @returns
 * @example
 *  app.use(createNetwork())
 */
function createNetwork(props) {
    if (!WuhaoNetwork.simpleInstance) {
        var reflectServices = Reflect.getMetadata(SERVICE_FLAG, ServiceStack) || [];
        var reflectMiddlewares = Reflect.getMetadata(MIDDLEWARE_FLAG, MiddlewareStack) || [];
        var _a = props || {}, _b = _a.services, services = _b === void 0 ? [] : _b, _c = _a.middlewares, middlewares = _c === void 0 ? [] : _c, remain = __rest(_a, ["services", "middlewares"]);
        WuhaoNetwork.simpleInstance = new WuhaoNetwork(__assign(__assign({}, remain), { services: __spreadArray(__spreadArray([], services, true), reflectServices, true), middlewares: __spreadArray(__spreadArray([], middlewares, true), reflectMiddlewares, true) }));
    }
    return WuhaoNetwork.simpleInstance;
}
/**
 * 定义服务接口，返回调用函数
 * @param serviceDefine: iService | iArrayService
 * @returns request(params: RequestParams)
 */
function useService(serviceDefine) {
    var service = transformService(serviceDefine);
    if (!service)
        return;
    if (WuhaoNetwork.simpleInstance) {
        WuhaoNetwork.simpleInstance.service.register(service);
    }
    else {
        var services = Reflect.getMetadata(SERVICE_FLAG, ServiceStack) || [];
        if (services.length === 0 ||
            services.some(function (item) { return item.name !== service.name; })) {
            services.push(service);
        }
        Reflect.defineMetadata(SERVICE_FLAG, services, ServiceStack);
    }
    return function (params) {
        return WuhaoNetwork.simpleInstance.send(__assign(__assign({}, service), params));
    };
}
/**
 * 注册中间件
 * @param middleware 中间件参数
 * @returns 中间件名称
 */
function useMiddleware(middleware) {
    if (!middleware)
        return;
    if (!WuhaoNetwork.simpleInstance) {
        var mids = Reflect.getMetadata(MIDDLEWARE_FLAG, MiddlewareStack) || [];
        if (mids.some(function (mid) { return mid.name === middleware.name; })) {
            throw new Error("middleware [".concat(middleware.name, "] duplicate definition!"));
        }
        mids.push(middleware);
        Reflect.defineMetadata(MIDDLEWARE_FLAG, mids, MiddlewareStack);
        return middleware.name;
    }
    return WuhaoNetwork.simpleInstance.middleware.register(middleware);
}
/**
 * 发起请求
 * @param name 服务配置中的名称
 * @param params 请求参数
 * @returns
 */
function useFetch(name, params) {
    if (!WuhaoNetwork.simpleInstance)
        return;
    var service = WuhaoNetwork.simpleInstance.service.sources.find(function (item) { return item.name === name; });
    return WuhaoNetwork.simpleInstance.send(__assign(__assign({}, service), params));
}

export { WuhaoNetwork, createNetwork, useFetch, useMiddleware, useService };
