## v3.11.1 - 2025-07-03

## 3.11.1 (2025-07-03)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added missing exports for types ([8de86cb](https://github.com/Hank-IT/ui/commit/8de86cb7ddeca2b8a2233d3ed332ee6718fa8261))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Fix paths for state ([b5af348](https://github.com/Hank-IT/ui/commit/b5af3488866478ec7052dca09d9db8f26c1b1c94))
* Fix typescript errors in state class ([b4bad8d](https://github.com/Hank-IT/ui/commit/b4bad8dc39037a9a860bbe5bce39dac12dfb4622))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added checked ref to useGlobalCheckbox composable ([ddcceee](https://github.com/Hank-IT/ui/commit/ddcceee2c57979dbb19d873aa2a70a44f04fcf46))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added State class; Added vitepress with documentation for forms and states ([3f519ed](https://github.com/Hank-IT/ui/commit/3f519edfa1952856cca433f21a55f80bcb7123b0))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([63533d0](https://github.com/Hank-IT/ui/commit/63533d093756380c636d9f85d279f8bb54709eda))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improve global checkbox handling ([0bcf75d](https://github.com/Hank-IT/ui/commit/0bcf75dbfbd8a28594750eadb87313aeaa45286f))
* Improve state class ([37de855](https://github.com/Hank-IT/ui/commit/37de8557b8bc0f419d7ff35dfb6b9b1409f986bc))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.11.0 - 2025-07-03

# 3.11.0 (2025-07-03)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added missing exports for types ([8de86cb](https://github.com/Hank-IT/ui/commit/8de86cb7ddeca2b8a2233d3ed332ee6718fa8261))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Fix paths for state ([b5af348](https://github.com/Hank-IT/ui/commit/b5af3488866478ec7052dca09d9db8f26c1b1c94))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added checked ref to useGlobalCheckbox composable ([ddcceee](https://github.com/Hank-IT/ui/commit/ddcceee2c57979dbb19d873aa2a70a44f04fcf46))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added State class; Added vitepress with documentation for forms and states ([3f519ed](https://github.com/Hank-IT/ui/commit/3f519edfa1952856cca433f21a55f80bcb7123b0))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([63533d0](https://github.com/Hank-IT/ui/commit/63533d093756380c636d9f85d279f8bb54709eda))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improve global checkbox handling ([0bcf75d](https://github.com/Hank-IT/ui/commit/0bcf75dbfbd8a28594750eadb87313aeaa45286f))
* Improve state class ([37de855](https://github.com/Hank-IT/ui/commit/37de8557b8bc0f419d7ff35dfb6b9b1409f986bc))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.10.1 - 2025-07-02

## 3.10.1 (2025-07-02)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added missing exports for types ([8de86cb](https://github.com/Hank-IT/ui/commit/8de86cb7ddeca2b8a2233d3ed332ee6718fa8261))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Fix paths for state ([09775c0](https://github.com/Hank-IT/ui/commit/09775c00988c8a8af4fdec0070a6c3ad507c8506))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added checked ref to useGlobalCheckbox composable ([ddcceee](https://github.com/Hank-IT/ui/commit/ddcceee2c57979dbb19d873aa2a70a44f04fcf46))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added State class; Added vitepress with documentation for forms and states ([3f519ed](https://github.com/Hank-IT/ui/commit/3f519edfa1952856cca433f21a55f80bcb7123b0))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([63533d0](https://github.com/Hank-IT/ui/commit/63533d093756380c636d9f85d279f8bb54709eda))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improve global checkbox handling ([0bcf75d](https://github.com/Hank-IT/ui/commit/0bcf75dbfbd8a28594750eadb87313aeaa45286f))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.10.0 - 2025-07-02

# 3.10.0 (2025-07-02)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added missing exports for types ([8de86cb](https://github.com/Hank-IT/ui/commit/8de86cb7ddeca2b8a2233d3ed332ee6718fa8261))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added checked ref to useGlobalCheckbox composable ([ddcceee](https://github.com/Hank-IT/ui/commit/ddcceee2c57979dbb19d873aa2a70a44f04fcf46))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added State class; Added vitepress with documentation for forms and states ([3f519ed](https://github.com/Hank-IT/ui/commit/3f519edfa1952856cca433f21a55f80bcb7123b0))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([63533d0](https://github.com/Hank-IT/ui/commit/63533d093756380c636d9f85d279f8bb54709eda))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improve global checkbox handling ([0bcf75d](https://github.com/Hank-IT/ui/commit/0bcf75dbfbd8a28594750eadb87313aeaa45286f))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.9.0 - 2025-06-17

# 3.9.0 (2025-06-17)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added missing exports for types ([8de86cb](https://github.com/Hank-IT/ui/commit/8de86cb7ddeca2b8a2233d3ed332ee6718fa8261))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added checked ref to useGlobalCheckbox composable ([ddcceee](https://github.com/Hank-IT/ui/commit/ddcceee2c57979dbb19d873aa2a70a44f04fcf46))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([63533d0](https://github.com/Hank-IT/ui/commit/63533d093756380c636d9f85d279f8bb54709eda))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improve global checkbox handling ([1acffbc](https://github.com/Hank-IT/ui/commit/1acffbc79fea5ff1fb6d3fea1f92244bf31690f7))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.8.0 - 2025-06-17

# 3.8.0 (2025-06-17)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added missing exports for types ([8de86cb](https://github.com/Hank-IT/ui/commit/8de86cb7ddeca2b8a2233d3ed332ee6718fa8261))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added checked ref to useGlobalCheckbox composable ([8f88466](https://github.com/Hank-IT/ui/commit/8f884661ab0eb76bafb221ffaabffab2e05956b3))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([63533d0](https://github.com/Hank-IT/ui/commit/63533d093756380c636d9f85d279f8bb54709eda))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.7.1 - 2025-06-16

## 3.7.1 (2025-06-16)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added missing exports for types ([077f1d1](https://github.com/Hank-IT/ui/commit/077f1d136bc309ccd2cbae5ace15da9b6028ed1d))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([6745b91](https://github.com/Hank-IT/ui/commit/6745b91a142dbd1e52f8cc541dfea90153a19921))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.7.0 - 2025-06-16

# 3.7.0 (2025-06-16)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([5ee838e](https://github.com/Hank-IT/ui/commit/5ee838e86f8b41cd713da0b1ef98a33425666a83))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Added viewDriverFactory param (via options object) to paginator ([6745b91](https://github.com/Hank-IT/ui/commit/6745b91a142dbd1e52f8cc541dfea90153a19921))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.6.1 - 2025-06-15

## 3.6.1 (2025-06-15)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Fix imports in persistenceDrivers ([1e504b6](https://github.com/Hank-IT/ui/commit/1e504b6c8a118fbae1b1badc90f4122773eab8ad))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added sync value method ([9ea03c1](https://github.com/Hank-IT/ui/commit/9ea03c1fad3b50b084818d18cf5d2b9f7a2ad1a9))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([dbe27a9](https://github.com/Hank-IT/ui/commit/dbe27a97af666aa9c18ce26180c080eef16470ff))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.6.0 - 2025-06-14

# 3.6.0 (2025-06-14)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added sync value method ([c62f13c](https://github.com/Hank-IT/ui/commit/c62f13cd7ffd2881cd92cd4b61d513714c11930d))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Move persistence drivers to own service and make them more generic ([8b09996](https://github.com/Hank-IT/ui/commit/8b099964cf14795499e60e332a0c06d869c358b4))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.5.0 - 2025-05-25

# 3.5.0 (2025-05-25)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added ci scripts ([89e8417](https://github.com/Hank-IT/ui/commit/89e8417de838fc5d3e774a1711e560b35f6c9712))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added sync value method ([c62f13c](https://github.com/Hank-IT/ui/commit/c62f13cd7ffd2881cd92cd4b61d513714c11930d))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



## v3.4.1 - 2025-05-24

## 3.4.1 (2025-05-24)


### Bug Fixes

* Added BulkRequestExecutionMode enum to export ([a284ac8](https://github.com/Hank-IT/ui/commit/a284ac8bd719b4a6d8e9a403a80629c0f7fccce4))
* Added missing exports ([c90cc0b](https://github.com/Hank-IT/ui/commit/c90cc0b145a20e59c3a9f09cddf4fa6e7312b8e1))
* Added persistence enhancements and dynamic suffix support. Fix: Improved typing ([614cd9d](https://github.com/Hank-IT/ui/commit/614cd9dfcd1e7f525c58fde703c13547a94efbde))
* Import BaseRequestContract as type ([c639617](https://github.com/Hank-IT/ui/commit/c639617f93c36dde7b201f96fe931f417c153575))
* Make BaseForm accept different types in RequestBody and FormBody ([227d0e8](https://github.com/Hank-IT/ui/commit/227d0e8fe7f0e5ff5ee4897f0a7241d3271addb8))
* Make request methods uppercase ([fac7c07](https://github.com/Hank-IT/ui/commit/fac7c074d43b70daa623ee7a452f136b22eb9c27))
* Recreate AbortController before sending requests ([876c4e3](https://github.com/Hank-IT/ui/commit/876c4e36b373f93235db300ed86d6710c36ead46))
* Rename appends to append; chore: Lower type constraints for FormBody; chore: Bump up version to 2.7.1 ([d37e7f5](https://github.com/Hank-IT/ui/commit/d37e7f5285a59da8c9dc1c9bdb8a4de4d76f3ddc))


### Features

* Added BaseForm and Array Pagination Driver ([def6b52](https://github.com/Hank-IT/ui/commit/def6b520d8aef7c0fa4a8bd38a7e24318addf15e))
* Added batch loader ([e6a8ebb](https://github.com/Hank-IT/ui/commit/e6a8ebbaafb0cd19173e60f25570a7f8a76e2af6))
* Added bulk requests feature ([df2055f](https://github.com/Hank-IT/ui/commit/df2055f70e0a33fa7dd25c03adb43387d8cf2232))
* Added ci scripts ([1f4165d](https://github.com/Hank-IT/ui/commit/1f4165d6f659789a2095d8c244fa6a0e62785803))
* Added DeferredPromise; feat: Added supports export ([ba9a1c3](https://github.com/Hank-IT/ui/commit/ba9a1c31a248701f8aaaa17a9548512ee0074e50))
* Added getBody method ([f1e7dc3](https://github.com/Hank-IT/ui/commit/f1e7dc38d2ead6e30d77aba1317b4c3a6708b860))
* Added getRequest() method to RequestDriver; feat: Added Access to dataDriver to Paginator; feat: Generate uuid per request; fix: Ensure request params arent mutated; chore: Added Tests for mergeDeep and ignore some typescript errors ([8202db6](https://github.com/Hank-IT/ui/commit/8202db6618d02c6b8c51e41ba169edacfc5a99ed))
* Added helper for setting abort signal on request ([b2679c4](https://github.com/Hank-IT/ui/commit/b2679c422a6d4a9e668efa5ec01d8557225edff9))
* Added initial loading state to vue request loader ([6b34b82](https://github.com/Hank-IT/ui/commit/6b34b826ca1f47b270955d43efbf672c064a1794))
* Added mode feature to BulkRequestSender; feat: Added retry feature to BulkRequestSender ([ea27dec](https://github.com/Hank-IT/ui/commit/ea27deccdb9ee44a3c7e9a9c92e2a9c7581529c5))
* Added off method to BulkRequestSender to clear event listeners ([12593e3](https://github.com/Hank-IT/ui/commit/12593e31d84004ef99f6d890f55aff038892d399))
* Added PropertyAwareArray class which enables the array to property conversion feature ([5c23c89](https://github.com/Hank-IT/ui/commit/5c23c89f545834b9de9a2a0cf50048e6cbb752c2))
* Added propertyAwareToRaw() helper; chore: Bump up version to 3.1.0 ([8a12a7e](https://github.com/Hank-IT/ui/commit/8a12a7e068a10555ec6f12ab95708a51062e7ee3))
* Added sent state and removed semicolons ([8d7b56c](https://github.com/Hank-IT/ui/commit/8d7b56caa4458aa30d574cea33b75ff5689996ec))
* Added setRequests method to BulkRequestSender ([e377538](https://github.com/Hank-IT/ui/commit/e377538a7e56074d0dadc451b960014fd362268a))
* Added some array helper methods to BaseForm ([98cd03e](https://github.com/Hank-IT/ui/commit/98cd03ecb1af91875243f1d57493a124b4224e13))
* Added types for PropertyAwareArray; Bump up version to 3.2.0 ([137ba48](https://github.com/Hank-IT/ui/commit/137ba4854de89559003f122163d514b9557cbe8d))
* Allow form class to dynamically generate properties, ignore certain properties and remap errors to different fields ([ca65690](https://github.com/Hank-IT/ui/commit/ca65690835eec25dce91e69e6d9ca7ca38542f91))
* Ignore some type errors ([6f08557](https://github.com/Hank-IT/ui/commit/6f0855741e2b3982449f56b80f4fdd71e9a8c719))
* Improved typing in bulk request feature ([edc6cc2](https://github.com/Hank-IT/ui/commit/edc6cc2c2bbf3f1df7f0c6c915054ebd8faa6607))
* Make PropertyAwareArray a subtype of array ([9e2e05e](https://github.com/Hank-IT/ui/commit/9e2e05e01dc9f16c5c82af5fea1bb950edbafbbf))
* Make VueRequestLoader track requests; fix: useIsOpenFromVar should always return a boolean as isOpenFromVar ([5579aa1](https://github.com/Hank-IT/ui/commit/5579aa1284176b0c6a445e71029663029ebdf38e))
* Refactored composables ([cf86741](https://github.com/Hank-IT/ui/commit/cf86741a78f24465128363c687063bf862b5f4e6))
* Refactored library using typescript; Bump version to 2.0.0 ([ba17085](https://github.com/Hank-IT/ui/commit/ba17085091bd54cbf0d4eafbf5a95312b3a7ac48))
* Refactored loading feature ([0f8163d](https://github.com/Hank-IT/ui/commit/0f8163d7227ef0916054ef4ba685d609d3cdfce9))
* Refactored PropertyAwareArray to inherit array; Adjustd BaseForm accordingly ([1c85f2e](https://github.com/Hank-IT/ui/commit/1c85f2e73ee291694d494513347e300e5a792b66))
* Resolve callbacks in header object to string ([f7534bb](https://github.com/Hank-IT/ui/commit/f7534bbe02082e83359d0ada0db4adad604b5ab4))



