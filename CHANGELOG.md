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



